import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useEffect } from "react";
import { useState } from "react";
import { updateCartLength } from "../Redux/Actions/CartActions";

function FormExample() {
  
const dispatch= useDispatch()
const navigate= useNavigate()
const reduxCartLength= useSelector((state)=> state.cartData.cartLength)
const reduxCartList= useSelector((state)=> state.cartData.cart)

const cartLengths= JSON.parse(localStorage.getItem("myCart"))
console.log(reduxCartLength, "reduxcartlen")


useEffect(()=> {
dispatch(updateCartLength(reduxCartLength))
}, [dispatch, reduxCartLength])

const [cartLength, setCartLength]= useState(reduxCartLength)


useEffect(()=> {
  setCartLength(reduxCartLength)
},[reduxCartLength])

  const handleLogout=()=> {
    localStorage.removeItem("email")
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-5"  bg="dark"
      data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="/">Shopify</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
        <Container className="d-flex justify-content-center">
          <Nav>
            <Link to="/" className="text-white fs-5 text-decoration-none me-4">Home</Link>
            <Link to="/products" className="text-white fs-5 text-decoration-none me-4">Products</Link>
            <Link to="/orders" className="text-white fs-5 text-decoration-none me-4">Orders</Link>
          </Nav>
          </Container>
          <Container className="d-flex profile-icon">
            <div>
              <Link to="/cart">
              <Button variant="light" className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="bg-light text-dark"
                />
                <span className="fs-6 text-decoration-none">{cartLengths.length}</span>
              </Button>
              </Link>
            </div>
            <div className="ms-2">
              <DropdownButton
                variant="light"
                id="dropdown-basic-button"
                title={<FontAwesomeIcon icon={faUser} />}
                className="bg-light text-dark rounded">
                  {localStorage.getItem("email") === null ? 
                  <>
                  <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="register">Register</Dropdown.Item>
                  </>
                  : 
                  <>
                  <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                  }
              </DropdownButton>
            </div>
          </Container>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FormExample;


