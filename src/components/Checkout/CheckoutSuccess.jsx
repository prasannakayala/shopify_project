import React from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CheckoutSuccess = () => {
    const navigate= useNavigate()
  return (
    <Container className='min-vh-100 d-flex align-items-center justify-content-center'>
        <Row>
            <Col>
                <div className="card p-5" style={{backgroundColor: "#8276D2"}}>
                <div >
            <span style={{border: "2px solid #ffffff", borderRadius: "100%", padding: "10px"}}>
            <FontAwesomeIcon icon={faCheck} className='text-danger fw-bold fs-3' />           
             </span>
            </div>
          <h3 className="text-light mt-3 fs-1">Congratulations</h3>
          <h5 style={{fontSize: "16px", color: "#ffffff"}}>Your Order is Successful</h5>
          <div className="mt-3">
         
          <a href="/" style={{width: "100px", height: "40px", fontSize: "13px"}} 
          className="bg-danger text-white rounded text-decoration-none p-2" >Continue Shopping</a>
                </div>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default CheckoutSuccess
