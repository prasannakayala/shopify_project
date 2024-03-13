import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartLength } from "../Redux/Actions/CartActions";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const reduxCartLength= useSelector((state)=> state.cartData.cartLength)
  const reduxCartList= useSelector((state)=> state.cartData.cart)
  
  useEffect(()=> {
    setCartList(reduxCartList)
  },[reduxCartList])

  console.log(reduxCartLength, "reduxcartlen")

  useEffect(()=> {
    dispatch(updateCartLength(reduxCartLength))
    }, [dispatch, reduxCartLength])
    
    const [cartLen, setCartLen]= useState(reduxCartLength)
    
    useEffect(()=> {
      setCartLen(reduxCartLength)
    },[reduxCartLength])

  const email = localStorage.getItem("email");
  // console.log(email, "storageemail");

  let cartData = JSON.parse(localStorage.getItem("myCart"));
  console.log(cartData, "cartsdata")

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      for (let i = 0; i < cartData.length; i++) {
        const cartEmail = cartData[i].email;
        console.log(cartEmail, "cartemail");
        if (cartEmail === email) {
          setCartList(cartData);
        }
      }
    }
     else {
      console.log("Your cart is empty");
    }
  }, []);

const onHandleCheckout=()=> {
  const cartTotal= (subTotal + subTotal * (5/100)).toFixed(2)
  console.log(cartTotal, "carttotal")
  // navigate('/checkout', {state: {cartTotal}})
  navigate('/checkprofile', {state:{cartTotal}})
}

  const calculateTotalPrice = () => {
    return cartList.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.data.product_cost;
    }, 0);
  };

  const subTotal = calculateTotalPrice();

  const decrementQuantity = (item) => {
    const updatedCart = cartList.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartList(updatedCart);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
  };

  const incrementQuantity = (item) => {
    const updatedCart = cartList.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartList(updatedCart);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
  };

const handleRemoveFromCart=(itemId)=> {
  
    console.log(itemId, "itemid")
    // dispatch(removeFromCart(reduxCartLength-1, itemId))
    dispatch(removeFromCart(itemId))
}

useEffect(()=> {
  dispatch(updateCartLength(reduxCartLength))
  console.log(reduxCartLength, "REDUXCARTLENGGTH")
}, [reduxCartLength])

  return (
    <Container className="min-vh-100 d-flex justify-content-center p-5">
        {cartList.length >= 1 ?
         <Row>
          <Col xs={12} lg={8}>
          <div className="card cart-card">
            <h3 className="text-start ms-2">My Orders</h3>
            <Table borderless>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartList.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.data.product_image}
                        alt={item.data.product_name}
                        width="70"
                        height="80"
                        className="rounded"
                      />
                    </td>
                    <td>{item.data.product_name.slice(0, 21)}</td>
                    <td>{item.data.product_cost}</td>
                    <td>
                      <div className="d-flex">
                        <Button
                          variant="secondary"
                          className="minus-btn me-3"
                          onClick={() => decrementQuantity(item)}
                        >
                          -
                        </Button>
                        <span className="order-num border p-2">
                          {item.quantity}
                        </span>
                        <Button
                          variant="secondary"
                          className="plus-btn ms-3"
                          onClick={() => incrementQuantity(item)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>{item.quantity * item.data.product_cost}</td>
                    <td>
                      <Button
                        variant="danger"
                        style={{ border: "1px solid #D3D1D0" }}
                        onClick={()=>handleRemoveFromCart(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-light"
                        />
                      </Button>
                      {console.log(item.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
          </Col>
          <Col xs={12} lg={4}>
          <div className="card d-flex flex-column align-items-start p-3 review-card">
            <h3 className="text-start mb-4">Review Order</h3>
            <p>
              SubTotal: <span className="fw-bold">{subTotal}/-</span>
            </p>
            <p>
              GST%: <span className="fw-bold">{subTotal * (5 / 100)}/-</span>
            </p>
            <p>
              OrderTotal:{" "}
              <span className="fw-bold">
                {subTotal + subTotal * (5 / 100)}/-
              </span>
            </p>
            <div className="d-flex ">
              <img
                src="https://www.merchantmaverick.com/wp-content/uploads/2020/02/PayPal_Debit_Card.png"
                alt=""
                className="w-25 h-25"
              />
              <img
                src="https://cdn.vox-cdn.com/thumbor/FtAV-Waa1rTPheAkxv3o4i0MVf0=/0x0:1000x1000/1200x800/filters:focal(421x430:581x590)/cdn.vox-cdn.com/uploads/chorus_image/image/62800797/Mastercard_logo.0.jpg"
                alt=""
                className="w-25 h-25"
              />
              <img
                src="data:image/png;base64,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"
                alt=""
                className="w-25 h-25"
              />
              <img
                src="https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/blue-cash-everyday.png"
                alt=""
                className="w-25 h-25"
              />
            </div>
            <div className="d-grid p-4 w-100">
            <button className="btn btn-success " type="button" onClick={onHandleCheckout}>
              Proceed to Pay
            </button>
          </div>
        </div>
        </Col>
      </Row>
      : <div> <h3>Cart is empty</h3></div>
      }
    </Container>
  );
};

export default Cart;
