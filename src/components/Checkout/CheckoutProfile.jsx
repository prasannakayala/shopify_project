import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUsers } from "../Redux/Actions/LoginActions";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const CheckoutProfile = () => {
  const [checkData, setCheckData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUsers());
    const fetchData = usersList.find(
      (user) => user.email === localStorage.getItem("email")
    );
    if (fetchData) {
      setCheckData(fetchData);
    }
  }, [dispatch]);

  console.log(checkData, "CHECKFETCH");

  const usersList = useSelector((state) => state.login.login_data);
  console.log(usersList, "userslist");

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (
      (file && file.type === "image/png") ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        const photoURL = URL.createObjectURL(file);
        setSelectedImage({ base64: base64Image, url: photoURL });
      };
      reader.readAsDataURL(file);
    } else {
      console.log("Error");
    }
  };

  const profileImageSubmit = (e) => {
    e.preventDefault();
    const formData = {
      image: selectedImage?.base64,
      firstName: checkData.firstName,
      lastName: checkData.lastName,
      gender: checkData.gender,
      mobileNumber: checkData.mobileNumber,
      email: checkData.email,
    };

    axios
      .patch(`http://localhost:3005/registerData/${checkData.id}`, formData)
      .then((res) => {
        setCheckData({ ...checkData, image: res.data.image });
      })
      .catch((e) => {
        console.log("error uploading image", e);
      });
  };
  console.log(selectedImage, "selectedimage");

  const updateAddress= ()=> {
    const formData={
        image: checkData.image,
        firstName: checkData.firstName,
        lastName: checkData.lastName,
        gender: checkData.gender,
        mobileNumber: checkData.mobileNumber,
        email: checkData.email,
        address: ""
    }
    axios.put(`http://localhost:3005/registerData/${checkData.id}`,formData)
  }
  return (
    <Container className="min-vh-100 p-3">
      <Row>
        <h3 className="text-start">My Account</h3>
        <hr />
      </Row>
      <Row>
        <Col md={8} lg={6}>
          <img
            src={checkData.image}
            alt={checkData.firstName}
            width={100}
            height={100}
            className="rounded-circle"
          />
          <h4 className="text-danger">{checkData.firstName}</h4>
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={profileImageSubmit}
          >
            <input
              type="file"
              id="file"
              name="image"
              className="mt-3 ms-5"
              onChange={handleImageChange}
            />
            <div>
              <button
                className="btn btn-warning"
                type="submit"
                style={{ margin: "10px" }}
              >
                Upload
              </button>
            </div>
          </form>
          <div className="d-flex flex-row justify-content-center">
            <FontAwesomeIcon icon={faBars} className="mt-1 me-2" />
            <p>Order</p>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <FontAwesomeIcon icon={faUser} className="mt-1 me-2" />
            <p>Profile</p>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <FontAwesomeIcon icon={faAddressBook} className="mt-1 me-2" />
            <p>Address</p>
          </div>
        </Col>
        <Col md={9} lg={6}>
          <div className="card p-2">
          <form>
            <div className="d-flex">
           
              <h4 className="me-4">Address</h4>
              
              <Button variant="primary" onClick={updateAddress}>Add Address</Button>
            </div>
            <hr />
           
          </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutProfile;
