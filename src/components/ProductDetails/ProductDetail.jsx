import React, { useEffect, useState } from "react";
import {Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import ReactImageMagnify from "react-image-magnify";
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";
import { faFacebookF, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import VariantsExample from "../Loading/Loading";
import addToCart from "../Utilities/AddToCart";
import "./ProductDetail.css";
import { useDispatch } from "react-redux";
import { addToCartActions } from "../Redux/Actions/CartActions";


const ProductDetail = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading]= useState(true) 
  const [showRating, setShowRating] = useState(0);
  const [createRate, setCreateRate]= useState(0)
  const [imageUpdate, setImageUpdate]= useState()
  const { id } = useParams();

  const dispatch= useDispatch()
  const dashboard= localStorage.getItem("email")

  const updateRating= (newRating)=> {
    const newRate= (newRating +showRating)/2
    console.log(newRating, "update rating")
    console.log(showRating, "showRating")

     const newProducts= {
      product_name: products.product_name,
      product_cost: products.product_cost, 
      product_image: products.product_image,
      product_rating: Number(newRate)
     }

    axios.put(`https://products-8dk6.onrender.com/products/${id}`, newProducts)
    .then((res)=> {
      setShowRating(res.data.product_rating)
    })
    .catch((err)=> {
      console.log(err, "Rating update error")
    })
  }

  useEffect(() => {
    axios
      .get(`https://products-8dk6.onrender.com/products/${id}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false)
        setShowRating(res.data.product_rating)
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  console.log(showRating, "api rating")

  const ratingChanged = (newRating) => {
    console.log(newRating, "new");
    setCreateRate(newRating)
    // updateRating(newRating)
  };

  const updateSubimage= (image) => {
    setProducts((prevProducts)=> ({
      ...prevProducts, product_image: image
    }))
  }

  // console.log(products.subimages, "pro-img")

  const handleCart=(itemId, products, email)=> {
    dispatch(addToCartActions(itemId, products, email))
  }
  return (
    <Container className="detail-container">
      {loading ? <VariantsExample/> :
      (
        <div className="inner-container" key={products.product_name}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className="d-flex flex-column" >
            <ReactImageMagnify {...{
              smallImage: {
                alt: products?.product_name,
                isFluidWidth: true,
                src: products?.product_image
              },
              largeImage: {
                src: products?.product_image,
                width: 1200,
                height: 1800  
              }
            }} />
                <div className="d-flex mt-3">
                 {products.subimages && products.subimages.map((image)=> (
                   <img src={image} alt="" width="75" height="75" className="me-3"
                   onMouseOver={()=>updateSubimage(image)}/>
                 ))}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} className="d-flex flex-column align-items-start">
            <h5 className="text-start product-name fw-bold">{products.product_name}</h5>
            {products.product_rating && 
            <ReactStars
              count={5}
              size={30}
              edit={true}
              isHalf={true}
              value={products.product_rating}
              onChange={ratingChanged}
              activeColor="#ffd700"
            />
            }
            <p>{(products.product_rating).toFixed(1)}</p>
            <hr className="" style={{border: "1px solid #bfbfbf", width: "100%", marginTop: "-5px"}}/>
            <p className="fw-bold">Price: <span className="text-danger fw-bold fs-6">            
            <FontAwesomeIcon icon={faIndianRupeeSign} />{products.product_cost}</span></p>
            <div className="d-flex">
            <p className="fw-bold me-2">Color: </p>
            <span style={{width: "22px",marginRight:"5px", height:"22px", backgroundColor:"blue", border: "1px solid #000"}}>
            </span>
            <span> Blue</span>
            </div>
            <div className="mt-3 mb-3">
                <Button variant="danger" size="sm" style={{fontSize: "12px"}} on
                onClick={()=> handleCart(products.id, products, dashboard)}>ADD TO CART</Button>
                <Button variant="info" size="sm" style={{fontSize: "12px", marginLeft: "12px"}}
                onClick={()=>updateRating(createRate)}
                >RATE PRODUCT</Button>
            </div>
            <h6 className="fw-bold mt-3">Share</h6>
            <div className="d-flex">
              <WhatsappShareButton url={window.location.href}>
                <Button variant="success rounded-circle" style={{width: "45px", height:"45px", marginRight: "12px"}}>
                <FontAwesomeIcon icon={faWhatsapp} />
                </Button>
              </WhatsappShareButton>
              <FacebookShareButton url={window.location.href}>
                <Button variant="primary rounded-circle" style={{width: "45px", height:"45px", marginRight: "12px"}}>
                <FontAwesomeIcon icon={faFacebookF} />
                </Button>
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href}>
                <Button variant="info rounded-circle" style={{width: "45px", height:"45px", marginRight: "12px"}}>
                <FontAwesomeIcon icon={faTwitter} className="text-light" />
                </Button>
                </TwitterShareButton>
            </div>
          </Col>
        </Row> 
      </div>
      )}
      
    </Container>
  );
};

export default ProductDetail;
