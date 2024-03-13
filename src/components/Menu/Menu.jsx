import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UncontrolledExample from "../Carousel/Carousel";
import ProductCard from "../Reusable/ProductCard";
import VariantsExample from '../Loading/Loading'
import { useDispatch, useSelector } from "react-redux";
import { categoryFetching, productsFetching } from "../Redux/Actions/MenuAction";
import "./Menu.css";


const Menu = () => {
  // const [productsList, setProductsList] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch= useDispatch()  //initialize the dispatch function from react-redux to dispatch actions to the store.


  useEffect(() => {
    // dispatch the productsfetching action to fetch product data
    dispatch(categoryFetching())
    // axios
    //   .get("https://products-8dk6.onrender.com/products")
    //   .then((res) => {
    //     setProductsList(res.data);
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     console.log(e, "error");
    //     setLoading(false);
    //   });
  }, [dispatch]);

  // accessing the redux store state using useSelector to get the pyroducts_list and loading properties
  const productsList= useSelector(state=>state.products.products_list)
  const loading= useSelector(state=> state.products.loading)
  console.log(productsList, "productslist");
  

  return (
    <div className="menu-container">
      {/* <Container> */}
        <UncontrolledExample />
        <div className="d-flex flex-column justify-content-center py-3">
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <h4 className="mb-4 mt-3 fs-3">Popular Products</h4>
          {loading ? (<VariantsExample/>) : productsList.length >= 1 && (
              <Row>
                {productsList.map((product) => (
                  <Col xs={12} sm={12} md={6} lg={5} xl={4} xxl={4} className="d-flex align-items-center justify-content-center"
                  key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
          )}
          </Container>
        </div>
      {/* </Container> */}
    </div>
  );
};

export default Menu;
