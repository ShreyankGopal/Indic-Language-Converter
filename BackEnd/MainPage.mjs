import express from "express"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import bodyParser from "body-parser";
import Phonetics from "phonetics";
import { sleep } from "./sleep.mjs";
//./getItems.mjs has a temporary list of items, which is an array of strings. i will use this to see if the text enetered in text box is included in the string of any of the elements in the array. if yes then i will add a card under the search bar displaying that item as a link.
import {translate} from './languageTrans.mjs'
import { error } from "console";
import { Inventory } from "./InventoryItems.mjs";
import mysql from 'mysql'
import cors from "cors"
import { Router } from "express";
import util from 'util'
import promisify from "util.promisify";
var lang=['kn','hi','te']
var from='en'
var to='en'
var Itemdb = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Sghu*560',
    database : 'Ecomm',
    port:3306
  });
Itemdb.connect();

var qry=""
const query = util.promisify(Itemdb.query).bind(Itemdb);




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contentE={search:"Search",home:"Home",settings:"⚙️",help:"Help",order:"cart"}

const cartHeading={product:"Product",item:"Item",price:"Price",quantity:"Quantity",total:"Total Price",delete:"Delete"}

    
    

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('views',path.join(__dirname,"../FrontEnd/views"))
app.set('view engine','ejs');
app.use(cors());
const port=5003;
var router=express.Router()
//server will run in port 2000. If we get EaddrInUse error, then just change the port number to something else.

 
function searchCards(data,items){
    let itemMatchArray=[]
    dataDict={dataToBeTranslated:data};
    InventoryItems.forEach(item=>{

        if(Phonetics.metaphone(item.Item_name.toLowerCase()).includes(Phonetics.metaphone(dataDict.dataToBeTranslated.toLowerCase()))){
            itemMatchArray.push(item);
        }
        else{
            if(item.Item_name.toLowerCase().includes(dataDict.dataToBeTranslated.toLowerCase())){
                itemMatchArray.push(item);
            }

        }
    })
    return itemMatchArray;
}

//I am using this function to check if the text in textbox is included in the item list. and i have exported this function to use in DynamicSearchCard.js
//as of now dont worry about other files like languageTrans.mjs and translator.py

function translatePromise(stringText, from, to) {
    return new Promise((resolve, reject) => {
        translate(stringText, from, to, (error, result) => {
            if (error) {
                reject(error);
                
            } else {
                
                resolve(result.trim());
            }
        });
    });
}

async function TranslateHtmlElements(dictionary, from, to) {
    const dict = new Map();
    const keys = Object.keys(dictionary);
  
    await Promise.all(
        keys.map(async (key) => {
            try {
                console.log('translating from '+from+" to "+to)
                const translatedText = await translatePromise(dictionary[key], from, to);
                dict.set(key, translatedText);
                
            } catch (error) {
                console.log(error);
            }
        })
    );

    const plainObject = Object.fromEntries(dict);
    return plainObject;
}

var content=[]
for(var i=0;i<3;i++){
    console.log(lang[i])
    content.push(await TranslateHtmlElements(contentE,'en',lang[i]))
    console.log(content[i])

}
router.get("/",async (req,res)=>{
    console.log("to"+" "+to);
    console.log("from "+from);
    console.log(content);

    const arr=[]
    var translatedContent=""
    if(to==="en"){
        
        res.send(contentE);
    }
    else if(to==='kn'){
        res.send(content[0]);
    }
    else if(to==='te'){
        console.log(content[2])
        res.send(content[2]);
    }
    else if(to==='hi'){
        res.send(content[1]);
    }
    
    
    
})
router.get("/setting",async (req,res)=>{
    console.log("done;")
    var language={choose:"Choose the language"}
    var translatedLang;
    if(to==='en'){
        res.send(language);
    }
    else{
        translatedLang=await TranslateHtmlElements(language,from,to);
        console.log(translatedLang);
        res.send(translatedLang);
    }
})
router.post("/setting",(req,res)=>{
    const cont=req.body
    console.log(cont);
    to=cont.key
    console.log(to);
})
// router.get('/pages?',(req,res)=>{
//     const itemid=req.query.itemid;
    
// })
app.post('/inventory',async(req,res)=>{
    try{
        const invtry=req.body;
        const Item=invtry.item;
        if(to==='en'){
            qry="select * from Inventory where Item_name like '%"+Item+"%'"
            res.send("post request accepted");
        }
        else{
            const transItem={
                item:Item
            }
            console.log("to "+to+"from "+from)
            const translatedItem=await TranslateHtmlElements(transItem,to,from)
            
         console.log(translatedItem)
            qry="select * from Inventory where Item_name like '%"+translatedItem.item+"%' or Item_name like '%"+Item+"%'"
            res.send("post request accepted");
        }
        //console.log(Item)
        
        
    }
    catch(error){
        console.log(error);
    }
    
})
router.get('/inventory', async (req, res) => {
    let InventoryItems = [];
    let translatedInventory = [];
    
    try {
        // Wait until qry is populated
        while (qry.length === 0) {
            // Do nothing
        }

        const results = await query(qry);
        results.forEach(row => {
            InventoryItems.push({
                id: row.id,
                Title: row.Item_name,
                Desc: row.Description,
                Price: row.Item_price,
                Picture: row.ImagesFilePath
            });
        });

        if (to === 'en') {
            res.send(InventoryItems);
        } else {
           // console.log("not english");

            // Use Promise.all to ensure all translations are completed
            const translationPromises = InventoryItems.map(async (inv) => {
                const translationData = {
                    Title: inv.Title,
                    Desc: inv.Desc
                };

              //  console.log(translationData);

                const translatedTitleDesc = await TranslateHtmlElements(translationData, from, to);

                return {
                    id: inv.id,
                    Title: translatedTitleDesc.Title,
                    Desc: translatedTitleDesc.Desc,
                    Price: inv.Price,
                    Picture: inv.Picture
                };
            });

            translatedInventory = await Promise.all(translationPromises);

            //console.log(translatedInventory);
            res.send(translatedInventory);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/cart',async (req,res)=>{
    const props=req.body;
    console.log(props);
    
    const quer=`Select * from Cart where id=${props.id}`;
    const result=await query(quer);
    console.log(result);
    var flag;
    if(result.length===0){
        flag=1;
    }
    else{
        flag=0;
    }
    const insert=`insert into Cart values(${props.id},'${props.title}',${props.price},1)`;
    if(flag===1){
        try {
            await query(insert);
            res.status(201).send('Item added to cart');
        } catch (error) {
            console.log(error);
        }   
    }

    
})
router.get('/cart',async(req,res)=>{
    
    const quer="select C.id,C.item,C.price,C.quantity,I.ImagesFilePath from Cart C,Inventory I where C.id=I.id";
    const result=await query(quer);
    if(to=='en'){
        res.send([result,cartHeading])
    }
    else{
    var transResult=[]
    const translationPromises=result.map(async (row)=>{
        //console.log(row)
        const transdata={
            item:row.item
        }
        const translated=await TranslateHtmlElements(transdata,from,to)
        return {
            id:row.id,
            item:translated.item,
            price:row.price,
            quantity:row.quantity,
            ImagesFilePath:row.ImagesFilePath
        }

    })
    transResult=await Promise.all(translationPromises)
    var translatedHeading=await TranslateHtmlElements(cartHeading,from,to)
    
    res.send([transResult,translatedHeading]);
}
})
router.post("/cartdelete",async (req,res)=>{
    const data=req.body
    const id=data.id
    const deleteqry=`delete from Cart where id=${id}`
    await query(deleteqry)


})
router.post('/cartQuantity',async (req,res)=>{
    const data=req.body
    const quantity=data.quantity
    const qry=`update Cart set quantity=${quantity}`
    await query(qry)
})
app.use(router);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// Handle SIGINT for Ctrl + C
process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
        console.log('Server closed. Exiting process.');
        process.exit(0);
    });
});