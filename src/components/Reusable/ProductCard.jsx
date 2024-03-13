import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useDispatch } from "react-redux";
import ReactStars from 'react-rating-stars-component';
import { addToCartActions } from "../Redux/Actions/CartActions";

const ProductCard = ({ product }) => {
  const [createRating, setCreateRating]= useState(0)
  const dispatch= useDispatch()
  const dashboard= localStorage.getItem("email")

  const handleCart=(itemId, product, email)=> {
    dispatch(addToCartActions(itemId, product, email))
  }

  const ratingChanged = (newRating) => {
    console.log(newRating, "new");
    setCreateRating(newRating);
  };

  return (
    <div>
      <Card className="product-card" >
        <Card.Img
          variant="top"
          src={product.product_image}
          className="product-img"
        />
        <Card.Body>
          <Link to={`/product_detail/${product.id}`} className="text-decoration-none">
          <Card.Title className="text-info fs-5">
            {product.product_name}
          </Card.Title>
          </Link>
          <Card.Text>
            <strong>Rs.{product.product_cost}</strong>
          </Card.Text>
          <Button variant="danger" onClick={()=> handleCart(product.id, product, dashboard)}>Add To Cart</Button>
          <Card.Text className="d-flex align-items-center justify-content-center">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              edit={true}
              isHalf={true}
              value={product.product_rating}
              activeColor="#ffd700" 
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
