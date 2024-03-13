import React, { useEffect, useState } from "react";
import "./Products.css";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faIndianRupeeSign,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { categoryFetching, colorFetching } from "../Redux/Actions/MenuAction";
import VariantsExample from "../Loading/Loading";
import ProductCard from "../Reusable/ProductCard";
import ReactPaginate from "react-paginate";

const Products = () => {
  // states for handling search inputs and current page
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  // const [category, selectCategory]= useState("")

  // react hooks for dispatching actions and accessing data from the store
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products_list);
  const loading = useSelector((state) => state.products.loading);

  // constants for handling pagination
  const productsPerPage = 6;
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // filtering the products based on search input
  const filteredProducts = allProducts.filter((product) =>
    product.product_name?.toLowerCase().includes(searchInput.toLowerCase())
  );
  // slicing the products array to display only the ones on the current page
  const productsToDisplay = allProducts
    .filter((product) =>
      product.product_name?.toLowerCase().includes(searchInput.toLowerCase())
    )
    .slice(startIndex, endIndex);

  //fetching products when the component mounts
  useEffect(() => {
    dispatch(categoryFetching());
  }, []);

  // handling pagination click
  const handlePageClick = (selected) => {
    console.log(selected, "selected");
    setCurrentPage(selected.selected);
  };
  // handling search input change
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const categoryItems = [
    { name: "Bed", category_id: "61cc486ce286b5a96c18554a" },
    { name: "Sofa", category_id: "61cc47cde286b5a96c185545" },
    { name: "Others", category_id: "61cc484de286b5a96c185549" },
  ];

  const colorItems = [
    {
      color: "Blue",
      color_id: "61cc489be286b5a96c18554b",
    },
    {
      color: "Brown",
      color_id: "61ceeaee4e859ec2b2ae7a53",
    },
    {
      color: "Orange",
      color_id: "61ceeb334e859ec2b2ae7a55",
    },
    {
      color: "Green",
      color_id: "61ceeb4e4e859ec2b2ae7a56",
    },
  ];

  const selectCategory = (categoryId) => {
    console.log(categoryId, "categoryid");
    dispatch(categoryFetching(categoryId));
  };

  const selectColor = (colorId) => {
    console.log(colorId, "colorid");
    dispatch(colorFetching(colorId));
  };
  console.log("SHOPIFY");
  return (
    <div className="products-contain">
      <div className="side-bar">
        <Button variant="outline-secondary">All Products</Button>
        <DropdownButton
          variant="outline-secondary"
          id="dropdown-basic-button"
          title="Categories"
          className="text-dark rounded mt-3"
        >
          {categoryItems.map((category) => (
            <Dropdown.Item
              key={category.category_id}
              onClick={() => selectCategory(category.category_id)}
            >
              {category.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          variant="outline-secondary"
          id="dropdown-basic-button"
          title="Colors"
          className="text-dark rounded mt-3"
        >
          {colorItems.map((eachColor) => (
            <Dropdown.Item
              key={eachColor.color_id}
              onClick={() => selectColor(eachColor.color_id)}
            >
              {eachColor.color}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="main-page">
        <div className="d-flex align-items-center justify-content-end">
          <h4>Sort By: </h4>
          <Button variant="transparent" className="text-primary ">
            <FontAwesomeIcon icon={faStar} />
          </Button>
          <Button variant="transparent" className="text-primary ">
            <FontAwesomeIcon icon={faIndianRupeeSign} />
            <FontAwesomeIcon icon={faArrowUp} className="ms-2 fs-5" />
          </Button>
          <Button variant="transparent" className="text-primary ">
            <FontAwesomeIcon icon={faIndianRupeeSign} />
            <FontAwesomeIcon icon={faArrowDown} className="ms-2 fs-5" />
          </Button>
        </div>
        <InputGroup className="mb-3 mt-3">
          <Form.Control
            placeholder="Search Products"
            aria-label="search"
            aria-describedby="basic-addon1"
            onChange={handleSearch}
          />
        </InputGroup>
        <Container className="d-flex align-items-center justify-content-center">
          {loading ? (
            <VariantsExample />
          ) : (
            allProducts.length >= 1 && (
              <Row>
                {productsToDisplay.map((product) => (
                  <Col
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                    className="d-flex align-items-center justify-content-center"
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            )
          )}
        </Container>
        <Container className="d-flex align-items-center justify-content-center">
          {allProducts.length > 0 && (
            <ReactPaginate
              previousLabel={"← Prev"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredProducts.length) / productsPerPage}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              previousLinkClassName={"previousBttn"}
              containerClassName={"paginationBttns"}
              disbaledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Products;
