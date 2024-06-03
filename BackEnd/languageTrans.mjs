import { spawn } from "child_process";
import { json } from "express";
                  
export function translate(stringText,from,to,callback){
    if (typeof stringText !== 'string') {
        callback(null, stringText); // Directly pass stringText if it's not a string
        return;
    }
    const childpython = spawn('python',['translator.py',from,to,stringText])
    var text=''
    childpython.stdout.on('data',(data)=>{
        
        //console.log(`${data}`);
        text += data.toString();
     })
     childpython.on('close', (code) => {
        if (code === 0) {
            callback(null, text.trim()); // Pass translated text to the callback
            
        } else {
            console.log(stringText);
            callback(null, stringText); 
            
        }
    });

    childpython.on('error', (err) => {
        callback(`Translation process error: ${err.message}`, null);
    });
     
}

//export default translate;