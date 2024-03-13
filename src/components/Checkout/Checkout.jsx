import React from 'react'
import Cards from 'react-credit-cards';
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import './Checkout.css'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-credit-cards/es/styles-compiled.css';


const Checkout = () => {
    const [name, setName]= useState("")
    const [number, setNumber]= useState("")
    const [expiry, setExpiry]= useState("")
    const [cvc, setCvc]= useState("")
    const [issuer, setIssuer]= useState("")
    const [focused, setFocused]= useState("")
    const [cart, setCart]= useState([])
    let allItems=[]

    const navigate= useNavigate()
    const location= useLocation()
    const {cartTotal}= location.state

    useEffect(()=> {
        const cart= JSON.parse(localStorage.getItem("myCart"))
        setCart(cart)
    },[])

    const  handleInputFocus = (e) => {
        setFocused({ focus: e.target.name });
      }
     
      const email= localStorage.getItem("email")
    const handleCartSubmit=(e)=> {
        e.preventDefault()
        if (cart.length === 0){
            toast("Cart is empty")
        }else{
            cart.map((each)=> {
                let allOrdersData= {
                    name: each.data.product_name,
                    price: each.data.product_cost,
                    image: each.data.product_image,
                    email: each.email,
                    quantity: each.quantity
                }
                allItems.push(allOrdersData)
            })
        }
        let orderNumber= Math.random().toFixed(5).split(".")[1]
        let checkoutData= {
            allItems: allItems,
            orderNumber: orderNumber,
            total: cartTotal,
            email: email,
            // address: address
        }
        axios.post("http://localhost:3007/ordersData", checkoutData).then((res)=> {
            console.log(res.data, "checkoutdata")
        })
        navigate("/success")
        setNumber("")
        setName("")
        setExpiry("")
        setCvc("")
        localStorage.removeItem("myCart")
    }

  return (
    <Container className='checkout-container'>
      <Row className='d-flex align-items-center justify-content-center'>
        <Col>
        <ToastContainer/>
         <div className="card shadow checkout-card p-3">
            <h4 className='mb-3'>Enter payment details</h4>
            <Cards 
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused} />
            <form onSubmit={handleCartSubmit}>
                <Row className='mt-5'>
                    <Col>
                        <div className="form-group d-flex flex-column align-items-start mb-3">
                            <label htmlFor="name" className=''>Name on Card</label>
                            <input type="text" id="name" name='name' className='form-control' placeholder='Name' 
                            pattern='[a-zA-Z-]+' required value={name} onChange={(e)=> {setName(e.target.value)}} onFocus={handleInputFocus}/>
                        </div>
                    </Col>
                    <Col >
                        <div className="form-group d-flex flex-column align-items-start mb-3">
                            <label htmlFor="number"> Card Number</label>
                            <input type="number" id="number" name='number' className='form-control' placeholder='Number' 
                            pattern="[\d| ]{16,22}" required value={number} onChange={(e)=> {setNumber(e.target.value)}} onFocus={handleInputFocus}/>
                        </div>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm={6}>
                        <div className="form-group d-flex flex-column align-items-start mb-3">
                            <label htmlFor="expiry">Expiration Date</label>
                            <input type="tel" id="expiry" name='expiry' className='form-control' placeholder='Valid Thru' 
                            pattern="\d\d/\d\d" required value={expiry} onChange={(e)=> {setExpiry(e.target.value)}} onFocus={handleInputFocus}/>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="form-group d-flex flex-column align-items-start mb-3">
                            <label htmlFor="cvc">CVC</label>
                            <input type="tel" id="cvc" name='cvc' className='form-control' placeholder='cvc' 
                            pattern="\d{3}" required value={cvc} onChange={(e)=> {setCvc(e.target.value)}} onFocus={handleInputFocus}/>
                        </div>
                    </Col> 
                    <h5 className='mt-4'>Pay: <span className='text-danger fw-bold'>${cartTotal}</span></h5>
          <input type="hidden" name="issuer" value={issuer} />
          <div className="form-actions">
            <button type="submit" className='btn btn-danger mt-3'>Proceed</button>
          </div>
                    
                </Row>
            </form>
         </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout
