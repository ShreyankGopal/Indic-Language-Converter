import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Card(props) {
    const navigate = useNavigate();
    const cardStyle = {
        width: '18rem'
    };
    console.log('Card props:', props);
    const [card,setCard]=useState([]);
    function handleClick() {
        setCard(props);
        axios.post('http://localhost:5003/cart', props)
            .then(response => {
                console.log('Card added to cart:', response.data);
            })
            .catch(error => {
                console.error('Error adding card to cart:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            });
            navigate(`/inventory`);
    }
    return (
        <div className="card" id={`card-${props.id}`} style={cardStyle}>
            <img 
                className="card-img-top" 
                src={props.image}
                alt={`Image for ${props.title}`} 
                width="100%" 
                height="180" 
            />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.desc}</p>
                <a href="#" className="btn btn-primary" onClick={handleClick}>{props.price}</a>
            </div>
        </div>
    );
}

export default Card;