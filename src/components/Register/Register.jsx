import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FacebookShareButton, EmailShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import { registerData } from "../Redux/Actions/RegisterActions";
import { useDispatch } from "react-redux";
import {
  isValidEmail,
  isValidFirstName,
  isValidLastName,
  isValidMobileNumber,
  isValidPassword,
} from "../Validations/Validations";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    registeredUsers: [],
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to handle input changes in the form
  const handleInputs = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrorMessages({ ...errorMessages, [event.target.name]: "" });
  };

  // const handleErrors = ()=> {
  //   if (!isValidFirstName(formData.firstName) ||
  //   !isValidLastName(formData.lastName) ||
  //   !isValidEmail(formData.email) ||
  //   !isValidMobileNumber(formData.password) ||
  //   formData.password !== formData.confirmPassword){
  //     console.error("Form validation failed")
  //     return;
  //   }
  // }

  // function to handle form submission
  const handleForm = (event) => {
    event.preventDefault();

// create a data object with the form fields
    const postData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      gender: formData.gender,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    // validate the firstname
    // const validationMessage = isValidFirstName(formData.firstName) && isValidLastName(formData.lastName) &&
    // isValidEmail(formData.email) && isValidMobileNumber(formData.password) && isValidPassword(formData.password ) && isValidPassword(formData.confirmPassword);
    
    const validationMessages= {
      firstName: isValidFirstName(formData.firstName),
      lastName: isValidLastName(formData.lastName),
      email: isValidEmail(formData.email),
      mobileNumber: isValidMobileNumber(formData.mobileNumber),
      password: isValidPassword(formData.password),
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords do not match"
          : "",
    }
    console.log(validationMessages, "validationmesg")
    const hasValidationErrors = Object.values(validationMessages).some(
      (message) => message !== undefined
    );
    console.log(hasValidationErrors, "validationerrors")
    if (hasValidationErrors) {
      console.log("No errors, proceed with registration");
      dispatch(registerData(postData));
      navigate("/login");
    } else {
      console.log("Validation error:", validationMessages);
      setErrorMessages(validationMessages);
    }
    // axios.post("http://localhost:3005/registerData", postData).then((res)=> {
    //   setFormData({registeredUsers: res.data})

    //   setFormData({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     mobileNumber: "",
    //     gender: "",
    //     password: "",
    //     confirmPassword: ""
    //   })

    //   navigate("/login")
    // })
    console.log(formData, "FORMDATA");
  };

  return (
    <div className="register-container">
      <div>
        <EmailShareButton url={window.location.href}>
          <Button variant="danger">
            <FontAwesomeIcon icon={faGoogle} className="me-2" />
            Login with Gmail
          </Button>
        </EmailShareButton>
        <FacebookShareButton url={window.location.href}>
          <Button variant="primary" className="ms-3">
            <FontAwesomeIcon icon={faFacebookF} className="me-2" />
            Login with Facebook
          </Button>
        </FacebookShareButton>
      </div>
      <Container
        style={{
          backgroundColor: "#FAF6F9",
          padding: "20px",
          marginBottom: "40px",
        }}
        className="mt-5 rounded w-50"
      >
        <Row>
          <Col xs={12} className="text-center">
            <h2 className="fw-bold mb-4">Register</h2>
          </Col>
        </Row>
        <form onSubmit={handleForm}>
          <Row>
            <Col xs={12} lg={6} className="text-start">
              <label htmlFor="firstname" className="form-label fw-bold">
                FirstName:
              </label>
              <input
                type="text"
                id="firstname"
                className="form-control mb-3"
                placeholder="Enter First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputs}
              />
             {errorMessages.firstName && (
                <p className="text-danger">{errorMessages.firstName}</p>
              )}
               
            </Col>
            <Col xs={12} lg={6} className="text-start">
              <label htmlFor="lastname" className="form-label fw-bold">
                LastName:
              </label>
              <input
                type="text"
                id="lastname"
                className="form-control mb-3"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputs}
              />
                {errorMessages.lastName && (
                <p className="text-danger">{errorMessages.lastName}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6} className="text-start">
              <label htmlFor="email" className="form-label fw-bold">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleInputs}
              />
              {errorMessages.email && (
                <p className="text-danger">{errorMessages.email}</p>
              )}
            </Col>
            <Col xs={12} lg={6} className="text-start">
              <label htmlFor="mobile" className="form-label fw-bold">
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                className="form-control mb-3"
                placeholder="Enter Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputs}
              />
              {errorMessages.mobileNumber && (
                <p className="text-danger">{errorMessages.mobileNumber}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6} className="text-start">
              <label htmlFor="password" className="form-label fw-bold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control mb-3"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleInputs}
              />
              {errorMessages.password && (
                <p className="text-danger">{errorMessages.password}</p>
              )}
            </Col>
            <Col xs={12} lg={6} className="text-start">
              <label htmlFor="password" className="form-label fw-bold">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control mb-3"
                placeholder="Enter ConfirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputs}
              />
              {errorMessages.confirmPassword && (
                <p className="text-danger">{errorMessages.confirmPassword}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-start">
              <Form>
                <label htmlFor="gender" className="fw-bold mb-2">
                  {" "}
                  Gender
                </label>
                {["radio"].map((type) => (
                  <div
                    key={`default-${type}`}
                    className="mb-3 d-flex align-items-center"
                  >
                    <Form.Check
                      type={type}
                      id="Male"
                      label="Male"
                      name="gender"
                      value="Male"
                      onChange={handleInputs}
                    />
                    <Form.Check
                      type={type}
                      label="Female"
                      id="Female"
                      className="ms-3"
                      name="gender"
                      value="Female"
                      onChange={handleInputs}
                    />
                  </div>
                ))}
              </Form>
            </Col>
          </Row>
          <div className="text-start">
            <Button variant="success" type="submit">
              Register
            </Button>
            <a href="/login">
              <Button variant="warning" className="ms-3">
                Login
              </Button>
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Register;
