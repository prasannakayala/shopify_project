import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import {FacebookShareButton, EmailShareButton} from "react-share";
import { loginUsers } from "../Redux/Actions/LoginActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import {useForm} from 'react-hook-form'
import VariantsExample from "../Loading/Loading";

const Login = () => {

    // const [loginData, setLoginData]= useState({
    //     email: "",
    //     password: ""
    // })

    const [userInfo, setUserInfo]= useState([])
    const [loading, setLoading]= useState(true)
    // react hook form: getting form methods and validation rules
    const {register, handleSubmit, formState: {errors}}= useForm()
    const usersList= useSelector(state=> state?.login?.login_data)

    const navigate= useNavigate()
    const dispatch= useDispatch()

    // accessing the redux store state to get the login_data using useselector
    
    console.log(errors, "errors")

    console.log(usersList, "USERSLIST")
 
    const onHandleSignup= ()=> {
        navigate("/register")
    }

    // const handleLoginInputs= e => {
    //     setLoginData({...loginData, [e.target.name]: e.target.value})
    // }

    // const handleLogin= e => {
    //     e.preventDefault()
    //     const isUser= usersList.some((user)=> user.email === loginData.email && user.password === loginData.password)
    //     console.log(isUser, "ISUSER")
    //     if (isUser){
    //       // dispatch(loginUsers(loginData.email, loginData.password))
    //         navigate("/")
    //     }else{
    //         alert("Login failed")
    //     }
    // }

    
// function to handle form submission
    const onSubmit=(data) => {
      console.log(userInfo,data, "userInfo")
      if (data.email && data.password){
        console.log(usersList, "loginusers")
        usersList.map((item) => {
          if (item.email === data.email && item.password === data.password) {
            console.log("hai")
            localStorage.setItem("email", data.email)
            navigate("/")
          }
        });
        
      }else{
        toast("Retry fetching data")
      }
    }
      // fetching login data from redux when the component mounts
      useEffect(()=> {
        dispatch(loginUsers())
        .then(()=> setLoading(false))
        .catch(()=>setLoading(false))
      }, [dispatch])

  return (
    <div className="login-container">
      <Container>
      <ToastContainer />
        {loading ? <VariantsExample/> : 
        (<>
          <Row className="login-row">
            <Col className="d-flex flex-column button-container">
              <EmailShareButton url={window.location.href}>
              <Button variant="danger" className="mb-3 login-btn">
                <FontAwesomeIcon icon={faGoogle} className="me-2" /> Login with
                Gmail
              </Button>
              </EmailShareButton>
              <FacebookShareButton url={window.location.href}>
              <Button variant="primary" className="login-btn">
                <FontAwesomeIcon icon={faFacebookF} className="me-2" /> Login with
                Facebook
              </Button>
              </FacebookShareButton>
            </Col>
            <Col className="login-form  rounded" lg={6}>
              <h2 className="fw-bold text-center mb-5 mt-3">Login</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
              <InputGroup className="mb-1 w-75">
                <Form.Control
                  placeholder="Enter Email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  className="form-control"
                  // onChange={handleLoginInputs}
                  name="email"
                  // value={loginData.email}
                  {...register("email", {required: "Email is required*", pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter the valid email"
                  }})}
                />
              </InputGroup>
              <p className="text-danger align-self-start ps-5">{errors.email?.message}</p>
  
              {/* {loginData.email !== "" && isValidEmail(loginData.email) && (<p className="text-danger">Enter valid email***</p>)} */}
              <InputGroup className="mb-1 w-75">
                <Form.Control
                  placeholder="Password"
                  type="password"
                  aria-describedby="basic-addon1"
                  className="form-control"
                  // onChange={handleLoginInputs}
                  name="password"
                  // value={loginData.password}
                  {...register("password", {required: "Password is required*", pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message: "Please enter the password with capital letter, length more than 3"
                  }})}
                />
              </InputGroup>
              <p className="text-danger align-self-start ps-5">{errors.password?.message}</p>
  
              {/* {loginData.password !== "" && !isValidEmail(loginData.password) && (<p className="text-danger">Enter valid password</p>)} */}
  
              <Button variant="success" type="submit">Login</Button>
              </form>
            </Col>
          </Row>
          <Row>
              <Col xs={12} className="mt-5">
                  <Button className="register-btn" onClick={onHandleSignup}>Register</Button>
                  <Button className="register-btn ms-3">Forgot password?</Button>
              </Col>
          </Row>
          </>)
        }
      
      </Container>
    </div>
  )
}

export default Login;
