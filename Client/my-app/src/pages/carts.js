import React, { useState } from "react";

import { useEffect } from "react";
import axios from "axios";
import './cart.css'
import Home from "./home";
import Loading from "./Loading";

import Cart from "./cart";

function Carts(){
    
	const [result,setResult]=useState([]);
	useEffect(()=>{
		
		axios.get("http://localhost:5003/cart")
		.then((response)=>{
			setResult(response.data);
			console.log(response.data)
			console.log("logged the response!")
			
		})
		.catch((error)=>{
			console.log(error);
		})
	})
    useEffect(() => {
        console.log('Updated Result:', result); // Option 2
    });
	if (!result.length) {
        return <div><Loading /></div>; // Add a loading state to handle undefined result
    }
	const cartItems = result[0];
    const headings = result[1];
	
    return(
		<div>
		<Home />
		<div class="shopping-cart section">
		<div class="container">
			<div class="row">
        <div className="col-12 shopping-cart" >
		
		<table className="table shopping-summery">
			<thead >
				
				<tr className="main-hading">
        			<th className="text-center">{headings.product}</th>
        			<th className="text-center">{headings.item}</th>
        			<th className="text-center">{headings.price}</th>
					<th className="text-center">{headings.quantity}</th>
        			<th className="text-center">{headings.total}</th>
					<th className="text-center">{headings.delete}</th>
        			<th className="text-center"><i className="ti-trash remove-icon"></i></th>
    			</tr>
			</thead>
			
                {cartItems.map((row)=>(
                    <Cart 
                        id={row.id}
                        item={row.item}
                        price={row.price}
                        quantity={row.quantity}
						picture={row.ImagesFilePath}
                    />
                ))}
                
            
        </table>
    </div>
	</div>
	</div>
	</div>
	</div>
        
    )
}
export default Carts;