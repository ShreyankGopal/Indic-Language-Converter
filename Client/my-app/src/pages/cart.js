import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './cart.css'

function Cart(props){
	const [quantity,setQuantity]=useState(props.quantity);
	const [totalPrice,setTotalPrice]=useState(props.price*props.quantity);
    function handleClick(){
        axios.post("http://localhost:5003/cartdelete",{id:props.id})
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })

    }
	function handleClickPlus(){
		
		if(quantity===10){
			setTotalPrice(quantity*props.price);
            axios.post("http://localhost:5003/cartQuantity",{quantity:quantity})
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })

		}
		else{
			setQuantity(quantity+1);
            
			setTotalPrice((quantity+1)*props.price);
            axios.post("http://localhost:5003/cartQuantity",{quantity:quantity+1})
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
			
		}
        
        
	}
	function handleClickMinus(){
		if(quantity===1){
			setTotalPrice(quantity*props.price);
            axios.post("http://localhost:5003/cartQuantity",{quantity:quantity})
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
		}
		else{
			setQuantity(quantity-1);
			setTotalPrice((quantity-1)*props.price);
            axios.post("http://localhost:5003/cartQuantity",{quantity:quantity-1})
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
		}

	}
    return(
        
		
    <tbody className="shopping-summery">
        <tr className="shopping-summery tbody tr" id={`item-${props.id}`}>
            <td className="shopping-summery tbody tr img" data-title="No">
                <img className="product img" src={props.picture} alt="#" />
            </td>
            <td className="shopping-summery tbody tr product-des" data-title="Description">
                <p className="product-name">{props.item}</p>
            </td>
            <td className="shopping-summery tbody tr price" data-title="Price">
                <span>{props.price}</span>
            </td>
            <td className="shopping-cart tbody tr qty" data-title="Qty">
                <div className="input-group">
                    <div className="button minus">
                        <button type="button" className="btn btn-primary btn-number" data-type="minus" data-field="quant[1]" onClick={handleClickMinus}>
                            &#8722;
                        </button>
                    </div>
                    <input type="text" name="quant[1]" className="shopping-cart tbody tr qty input-number" data-min="1" data-max="100" value={quantity} readOnly />
                    <div className="button plus">
                        <button type="button" className="btn btn-primary btn-number" data-type="plus" data-field="quant[1]" onClick={handleClickPlus}>
                            &#43;
                        </button>
                    </div>
                </div>
            </td>
			<td className="total-amount" data-title="Price">
                <span>{totalPrice}</span>
            </td>
            <td class="action" data-title="Remove">
			<button type="button"  onClick={handleClick}>
				<i style={{fontSize: '24px'}} className="fa">🚮</i>
            </button>
			</td>
        </tr>
    </tbody>


			
    )
}
export default Cart;