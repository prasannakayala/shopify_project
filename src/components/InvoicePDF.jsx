import React, { useEffect, useState } from 'react'
import { faArrowDown, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {jsPDF} from 'jspdf'
import html2canvas from "html2canvas";


const InvoicePDF = () => {
  const [cartMenu, setCartMenu]= useState([])

  const location= useLocation()
  const  {orderNumList, date}= location.state
  const reduxCartList= useSelector(state=> state.cartData.cart)

  useEffect(()=> {
    setCartMenu(reduxCartList)
  }, [reduxCartList])

  const calculateTotalPrice = () => {
    return cartMenu.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.data.product_cost;
    }, 0);
  };

  const subTotal = calculateTotalPrice();

const clickPDFTo=()=> {
  console.log("hai")
  const inputVoice= document.getElementById("divToPrint")
    // setDivToPrint(pdfCard)
    console.log(inputVoice, "pdfcard")
    html2canvas(inputVoice, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      console.log(pdf)
      const img = canvas.toDataURL();
      console.log(img)
      pdf.addImage(img, "JPEG", 0, 0);
      pdf.save("Shopify.pdf");
  });
  
}
  return (
    <div >
    <Container className='p-4'>
      <Row className='d-flex justify-content-center align-items-center mb-3'>
        <Col>
        <Button  variant="success" onClick={()=>clickPDFTo()}>Click To PDF <FontAwesomeIcon icon={faArrowDown} /></Button>
        </Col>
      </Row>
      <Card className='d-flex p-3' id="divToPrint">
        <Row className="">
          <Col className='text-start'>
          <h3>Shop<span className='text-danger'>ify</span></h3>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5aJmVYibJRB0ugs0U79Q8mBliOS1aQKkkVw&usqp=CAU" 
          alt="" className='w-50 mt-2' height="100" />
          </Col>
          <Col>
          {orderNumList.map((each)=> (
            <h5>OrderNo: <span className='fw-normal fs-6'>{each}</span></h5>
          ))}
          </Col>
        </Row>
      <Row>
        <Col className='text-start mt-5'>
        <span className='text-secondary'>FROM To</span><br/>
        <span className='fw-bold'>Doyle, Kuhlman and Zboncak</span><br/>
        <span className='text-secondary'>edibbert@johnston.com</span><br/>
        <span className='text-secondary'>8884580909</span><br/>
        </Col>
        <Col className='mt-5'>
        <span className='text-secondary'>STATUS</span><br/>
        <span className='text-success fw-bold me-3'>Paid</span><br/>
        <span className='text-secondary me-4'>DATE</span><br/>
        <p className='ms-4 fw-bold'>{date}</p>
        </Col>
      </Row>
      <Row>
        <Col className='text-start mt-2'>
        <span className='text-secondary '>BILL TO</span><br/>
        <span className='fw-bold'>pra@gmail.com, <br/>4532423, India</span>
        </Col>
        <Col className='mt-2'>
          <span className='text-secondary'>AMOUNT</span> <br/>
        <span className='fw-bold'><FontAwesomeIcon icon={faIndianRupeeSign} className='me-1' />{subTotal}</span>
        </Col>
      </Row>
      <Row>
        <Col>
        
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
      </Col>
      </Row>
      <Row className='text-start '><strong>Payment Terms</strong></Row>
      <Row className='text-start'><p>Please pay the amount within 30 days.</p></Row>
      </Card>
    </Container>
    </div>
  )
}

export default InvoicePDF
