import React, { useEffect, useState } from "react";

import {  Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./Orders.css";
import { useLocation } from "react-router-dom";

const Orders = () => {
  const [cartMenu, setCartMenu]= useState([])
  const [currentDate, setCurrentDate] = useState(new Date());

  const date= currentDate.toLocaleDateString()

const location = useLocation()

  const reduxCartList= useSelector(state=> state.cartData.cart)
  useEffect(()=> {
    setCartMenu(reduxCartList)
  }, [reduxCartList])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
 
  return (
    <div>
      <Container className="orders-container">
        <p className="text-danger text-start">DATE: <span className="text-dark fw-bold">{currentDate.toLocaleDateString()}</span></p>
      <Table bordered className='mt-3'>
        <thead>
          <tr className='text-start'>
          <th>Sr.No</th>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartMenu.map((item, index)=> (
            <tr className='text-start'>
              <td >{index+1}</td>
            <td ><img src={item.data.product_image} width="100"  alt="" /></td>
            <td >{item.data.product_name}</td>
            <td >{item.quantity}</td>
            <td>{item.data.product_cost}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      </Container>
    </div>
  );
};

export default Orders;
