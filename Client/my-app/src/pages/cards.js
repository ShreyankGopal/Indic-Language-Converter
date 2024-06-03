import react, { useState } from "react";
import Home from "./home";
import { useEffect } from "react";
import axios from "axios";
import Card from "./card"
function Cards(){
    const [cards,setCards]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5003/inventory")
        .then((response)=>{
          console.log(response.data);
          setCards(response.data);
         
        })
        .catch((error)=>{
          console.error('Error fetching data:', error);
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                }  else {
                    // Something happened in setting up the request
                    console.error('Error message:', error.message);
                }
        })
      });
      useEffect(() => {
        console.log('Updated cards:', cards);
    },[cards]);
    return(
      <div>
        <Home/>
      <div className="card-list">
          
          {cards.map((card) => (
                
              <Card
                  key={card.id} // Assuming each card has a unique `id`
                  id={card.id}
                  title={card.Title}
                  desc={card.Desc}
                  price={card.Price}
                  image={card.Picture}
              />
          ))}
      </div>
  </div>
    
    )
}
export default Cards;