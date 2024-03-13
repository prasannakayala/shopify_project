import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { loginUsers } from "../Redux/Actions/LoginActions";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VariantsExample from "../Loading/Loading";
import "./Profile.css";
import InvoicePDF from "../InvoicePDF";

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    image: "",
  });

  const [openAddress, setOpenAddress] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickPdf, setClickPdf] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddressModal, setShowAddressModal]= useState(false)
  const [showProfileModal, setShowProfileModal]= useState(false)
  const [addressData, setAddressData] = useState({
    mainAddress: "",
    pincode: "",
    city: "",
    currentState: "",
    country: "",
  });
  const [divToPrint, setDivToPrint] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visibleSection, setVisibleSection] = useState("profile");

  // const usersList = useSelector((state) => state.login.login_data);

  // console.log(usersList, "userslist")

  const openModal = () => {
    // setShowModal(true);
    setShowAddressModal(true)
    setShowProfileModal(true)
    // setVisibleModal(true);
  };

  const closeModal = () => {
    setShowAddressModal(false)
    setShowProfileModal(false)    // setVisibleModal(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const user = usersList.find(
      (each) => each.email === localStorage.getItem("email")
    );
    setUsersData(user);
    dispatch(loginUsers());
  }, [dispatch]);
  // console.log(usersData, "ordersuser")

  useEffect(() => {
    axios
      .get("http://localhost:3007/ordersData")
      .then((res) => {
        const ordersMenu = res.data.filter(
          (each) => each.email === localStorage.getItem("email")
        );
        if (ordersMenu.length > 0) {
          setOrdersList(ordersMenu);
        }
      })
      .catch((err) => {
        console.log("No orders");
      });
  }, []);

  const handleUpdates = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(loginUsers());
  }, [dispatch]);

  // console.log(profileData, "profiledata")

  const usersList = useSelector((state) => state.login.login_data);
  // console.log(usersList, "userslist")

  useEffect(() => {
    if (usersList) {
      const fetchData = usersList.find(
        (user) => user.email === localStorage.getItem("email")
      );

      setProfileData(fetchData);
      setLoading(false);
      console.log(fetchData, "fetchdata");
    }
  }, [usersList]);

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
      image: selectedImage.base64,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      gender: profileData.gender,
      mobileNumber: profileData.mobileNumber,
      email: profileData.email,
    };

    axios
      .patch(`http://localhost:3005/registerData/${profileData.id}`, formData)
      .then((res) => {
        setProfileData({ ...profileData, image: res.data.image });
      })
      .catch((e) => {
        console.log("error uploading image", e);
      });
  };
  // console.log(selectedImage, "selectedimage");

  const updateProfile = (id) => {
    let mobileChange =
      updatedData.mobileNumber !== ""
        ? updatedData.mobileNumber
        : profileData.mobileNumber;
    let firstNameChange =
      updatedData.firstName !== ""
        ? updatedData.firstName
        : profileData.firstName;
    let lastNameChange =
      updatedData.lastName !== "" ? updatedData.lastName : profileData.lastName;
    let genderChange =
      updatedData.gender !== "" ? updatedData.gender : profileData.gender;

    const data = {
      firstName: firstNameChange,
      lastName: lastNameChange,
      mobileNumber: mobileChange,
      gender: genderChange,
      email: profileData.email,
      image: profileData.image,
      password: profileData.password,
      confirmPassword: profileData.confirmPassword,
    };
    axios.put(`http://localhost:3005/registerData/${id}`, data).then((res) => {
      console.log(res.data, "dataupdate");
    });
    // setShowModal(false)
    // window.location.reload(false);
  };

  const firstName = profileData?.firstName || "";
  const lastName = profileData?.lastName || "";
  const mobileNumber = profileData?.mobileNumber || "";
  const gender = profileData?.gender || "";
  const email = profileData?.email || "";
  const image = profileData?.image || "";

  const handleAddressInputs = (event) => {
    setAddressData({ ...addressData, [event.target.name]: event.target.value });
  };

  const handleAddress = (event) => {
    console.log("address");
    event.preventDefault();

    const postAddress = {
      mainAddress: addressData.mainAddress,
      pincode: addressData.pincode,
      city: addressData.city,
      currentState: addressData.currentState,
      country: addressData.country,
    };
    const addressDatas = [
      {
        address: postAddress,
      },
    ];

    axios
      .post(
        `http://localhost:3005/registerData?id=${profileData.id}`,
        addressDatas
      )
      .then((res) => {
        setAddressData(res.data);
      });
      console.log(addressData, "addressdata");

  };
  // console.log(profileData.id, "profileid");
  // console.log(profileData, "profile");
  // console.log(profileData, "profiledata")

  const generatePdf = () => {
    // setClickPdf(true)

    const orderNumList = ordersList.map((order) => order.orderNumber);
    console.log(orderNumList, "orderNum");
    const date = currentDate.toLocaleDateString();
    navigate("/invoicepdf", { state: { orderNumList, date } });
  };

  const handleOrders = () => {
    setShowOrders(true);
    setShowProfile(false);
    setOpenAddress(false);
    setVisibleSection("orders");

    console.log("ORDERS");
  };

  const handleProfile = () => {
    setShowProfile(true);
    setShowOrders(false);
    setOpenAddress(false);
    setVisibleSection("profile");
  };
  
  const addAddress = () => {
    setOpenAddress(true);
    setShowOrders(false);
    setShowProfile(false);
    setVisibleSection("address");
  };

  return (
    <div className="min-vh-100 p-5">
      {loading ? (
        <VariantsExample />
      ) : (
        <>
          <h3 className="text-start">My Account</h3>
          <hr style={{ border: "1px solid #bfbfbf", width: "100%" }} />
          <Container>
          <Row>
          <Col sm={12} lg={6}>
<img
  src={profileData?.image}
  className="rounded-circle w-25 h-25"
  alt={firstName}
/>
<Row>
  <strong className="text-danger">{firstName}</strong>
</Row>
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
<div
  className="d-flex flex-row justify-content-center"
  onClick={handleOrders}
>
  <FontAwesomeIcon icon={faBars} className="mt-1 me-2" />
  <p>Order</p>
</div>
<div
  className="d-flex flex-row justify-content-center"
  onClick={handleProfile}
>
  <FontAwesomeIcon icon={faUser} className="mt-1 me-2" />
  <p>Profile</p>
</div>
<div
  className="d-flex flex-row justify-content-center"
  onClick={addAddress}
>
  <FontAwesomeIcon icon={faAddressBook} className="mt-1 me-2" />
  <p>Address</p>
</div>
</Col>
          </Row>
            <Row
              className="profile-row"
              // key={profileData.id}
            >
            
            <Col sm={12} lg={6}>
              {/* Profile Content */}
              {showProfile && (
                <Card>
                  <Card.Header as="h4" className="text-start p-3">
                    Profile
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex">
                      <Card.Text className="fw-bold"> FirstName: </Card.Text>
                      <span className="fw-bold ms-2">{profileData?.firstName}</span>
                    </div>
                    <div className="d-flex">
                      <Card.Text className="fw-bold"> LastName: </Card.Text>
                      <span className="fw-bold ms-2">{profileData?.lastName}</span>
                    </div>
                    <div className="d-flex">
                      <Card.Text className="fw-bold"> Email: </Card.Text>
                      <span className="fw-bold ms-2">{profileData?.email}</span>
                    </div>
                    <div className="d-flex">
                      <Card.Text className="fw-bold"> Gender: </Card.Text>
                      <span className="fw-bold ms-2">{profileData?.gender}</span>
                    </div>
                    <div className="d-flex">
                      <Card.Text className="fw-bold"> Mobile: </Card.Text>
                      <span className="fw-bold ms-2">{profileData?.mobileNumber}</span>
                    </div>
                    <hr style={{ border: "1px solid #bfbfbf", width: "100%" }} />
                    <div className="text-start">
                      <Button variant="secondary" onClick={openModal}>
                        Edit profile
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col sm={12} lg={6}>
            {/* Orders Content */}
            {showOrders && (
              <div className="card p-3 d-flex flex-column align-items-start">
                <h5 className="text-start">All Orders</h5>
                <hr style={{ width: "100%" }} />
                <div className="card d-flex flex-column align-items-start p-3">
                  <div className="text-start">
                    {ordersList.map((order) => (
                      <h6 className="text-success fw-bold">
                        Order No: <span className="text-dark ">{order.orderNumber}</span>
                      </h6>
                    ))}
                    <h6 className="text-danger fw-bold">
                      Date: <span className="fw-bold text-dark">{currentDate.toLocaleDateString()}</span>
                    </h6>
                  </div>
                  <div className="d-flex flex-wrap">
                    {ordersList.map((order) =>
                      order.allItems.map((item) => (
                        <img
                          src={item?.image}
                          alt={item.name}
                          key={item?.id}
                          width="75"
                          height="75"
                          className="ms-2 mb-2" 
                        />
                      ))
                    )}
                  </div>
                  <div className="d-flex align-items-start">
                    <Button variant="danger" onClick={generatePdf}>
                      INVOICE PDF
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Col>
            </Row>
          </Container>
          <Modal show={showAddressModal || showProfileModal} onHide={closeModal}>
  <Modal.Header closeButton>
    <Modal.Title>{showAddressModal ? 'Add Address Details' : 'Edit Profile'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form>
      {showAddressModal && (
        <>
          <textarea
            cols="55"
            rows="5"
            placeholder="Address"
            className="form-control"
            onChange={handleAddressInputs}
            name="mainAddress"
            value={addressData.mainAddress}
          />
          <div className="text-start">
            <span className="text-secondary">Max 100 characters</span>
          </div>
          <input
            type="text"
            placeholder="Pincode"
            className="form-control mb-3"
            onChange={handleAddressInputs}
            name="pincode"
            value={addressData.pincode}
          />
          <input
            type="text"
            placeholder="City"
            className="form-control mb-3"
            onChange={handleAddressInputs}
            name="city"
            value={addressData.city}
          />
          <input
            type="text"
            placeholder="State"
            className="form-control mb-3"
            onChange={handleAddressInputs}
            name="currentState"
            value={addressData.currentState}
          />
          <input
            type="text"
            placeholder="Country"
            className="form-control mb-3"
            onChange={handleAddressInputs}
            name="country"
            value={addressData.country}
          />
        </>
      )}
      {showProfileModal && (
        <>
          <input
            type="text"
            placeholder="Firstname"
            className="form-control mb-3"
            defaultValue={profileData.firstName}
            onChange={(e) => setUpdatedData({ ...updatedData, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="LastName"
            className="form-control mb-3"
            defaultValue={profileData.lastName}
            onChange={(e) => setUpdatedData({ ...updatedData, lastName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            className="form-control mb-3"
            defaultValue={profileData.email}
            disabled
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="form-control mb-3"
            defaultValue={profileData.mobileNumber}
            onChange={(e) => setUpdatedData({ ...updatedData, mobileNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Gender"
            className="form-control mb-3"
            defaultValue={profileData.gender}
            onChange={(e) => setUpdatedData({ ...updatedData, gender: e.target.value })}
          />
        </>
      )}
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>
      Close
    </Button>
    <Button variant="primary" onClick={showAddressModal ? handleAddress : () => updateProfile(profileData.id)}>
      {showAddressModal ? 'Submit' : 'Update'}
    </Button>
  </Modal.Footer>
</Modal>

          {divToPrint && <InvoicePDF divToPrint={divToPrint} />}
        </>
      )}
      </div>
  );
};

export default Profile;