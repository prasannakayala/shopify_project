
// <Col sm={12} lg={6}>
// <img
//   src={profileData?.image}
//   className="rounded-circle w-25 h-25"
//   alt={firstName}
// />
// <Row>
//   <strong className="text-danger">{firstName}</strong>
// </Row>
// <form
//   className="d-flex flex-column align-items-center"
//   onSubmit={profileImageSubmit}
// >
//   <input
//     type="file"
//     id="file"
//     name="image"
//     className="mt-3 ms-5"
//     onChange={handleImageChange}
//   />
//   <div>
//     <button
//       className="btn btn-warning"
//       type="submit"
//       style={{ margin: "10px" }}
//     >
//       Upload
//     </button>
//   </div>
// </form>
// <div
//   className="d-flex flex-row justify-content-center"
//   onClick={handleOrders}
// >
//   <FontAwesomeIcon icon={faBars} className="mt-1 me-2" />
//   <p>Order</p>
// </div>
// <div
//   className="d-flex flex-row justify-content-center"
//   onClick={handleProfile}
// >
//   <FontAwesomeIcon icon={faUser} className="mt-1 me-2" />
//   <p>Profile</p>
// </div>
// <div
//   className="d-flex flex-row justify-content-center"
//   onClick={addAddress}
// >
//   <FontAwesomeIcon icon={faAddressBook} className="mt-1 me-2" />
//   <p>Address</p>
// </div>
// </Col>
// <Col sm={12} lg={6}></Col>
// {openAddress && visibleSection==="address" && (
// <div className="card p-3 d-flex flex-column align-items-start">
// <div className="d-flex">
//   <h3>Address</h3>
//   <Button
//     variant="primary"
//     className="ms-5"
//     onClick={openModal}
//   >
//     Add Address
//   </Button>
//   <hr />
// </div>
// </div>
// )}
//   {showAddressModal && (
//     <div
//       className="modal show"
//       style={{ display: "block", position: "initial" }}
//     >
//       <Modal.Dialog>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Address Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <textarea
//               cols="55"
//               rows="5"
//               placeholder="Address"
//               className="form-control"
//               onChange={handleAddressInputs}
//               name="mainAddress"
//               value={addressData.mainAddress}
//             />
//             <div className="text-start">
//               <span className="text-secondary">
//                 Max 100 char
//               </span>
//             </div>
//             <h6 className="text-start mt-2">Address</h6>
//             <Row>
//               <Col xs={12}>
//                 <input
//                   type="text"
//                   placeholder="Pincode"
//                   className="form-control mb-3"
//                   onChange={handleAddressInputs}
//                   name="pincode"
//                   value={addressData.pincode}
//                 />
//               </Col>
//               <Col xs={12}>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   className="form-control mb-3"
//                   onChange={handleAddressInputs}
//                   name="city"
//                   value={addressData.city}
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col xs={12}>
//                 <input
//                   type="text"
//                   placeholder="states"
//                   className="form-control mb-3"
//                   onChange={handleAddressInputs}
//                   name="currentState"
//                   value={addressData.currentState}
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col xs={12}>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   className="form-control mb-3"
//                   onChange={handleAddressInputs}
//                   name="country"
//                   value={addressData.country}
//                 />
//               </Col>
//             </Row>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             type="submit"
//             onClick={(e) => handleAddress(e)}
//           >
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal.Dialog>
//     </div>
//   )}
  
// )  
// <Col sm={12} lg={6}>
// (showOrders && (
//     <div className="card p-3 d-flex flex-column align-items-start">
//       <h5 className="text-start">All Orders</h5>
//       <hr style={{ width: "100%" }} />
//       <div className="card d-flex flex-column align-items-start p-3">
//         <div className="text-start">
//           {ordersList.map((order) => (
//             <h6 className="text-success fw-bold">
//               Order No:{" "}
//               <span className="text-dark ">
//                 {order.orderNumber}
//               </span>
//             </h6>
//           ))}
//           <h6 className="text-danger fw-bold">
//             Date:
//             <span className="fw-bold text-dark">
//               {currentDate.toLocaleDateString()}
//             </span>
//           </h6>
//         </div>
//         <div className="d-flex flex-wrap">
//           {ordersList.map((order) =>
//             order.allItems.map((item) => (
//               <img
//                 src={item?.image}
//                 alt={item.name}
//                 key={item?.id}
//                 width="75"
//                 height="75"
//                 className="ms-2 mb-2"
//               />
//             ))
//           )}
//         </div>
//         <div className="d-flex align-items-start">
//           <Button
//             variant="danger"
//             onClick={() => generatePdf()}
//           >
//             INVOICE PDF
//           </Button>
//         </div>
//       </div>
//     </div>
// )
// </Col>
// <Col sm={7} lg={5}>
// {
//   showProfile &&
//   visibleSection === "profile" && (
//     <Card>
//       <Card.Header as="h4" className="text-start p-3">
//         Profile
//       </Card.Header>
//       <Card.Body>
//         <div className="d-flex">
//           <Card.Text className="fw-bold">
//             {" "}
//             FirstName:{" "}
//           </Card.Text>
//           <span className="fw-bold ms-2">{firstName}</span>
//         </div>
//         <div className="d-flex">
//           <Card.Text className="fw-bold"> LastName: </Card.Text>
//           <span className="fw-bold ms-2">{lastName}</span>
//         </div>
//         <div className="d-flex">
//           <Card.Text className="fw-bold"> Email: </Card.Text>
//           <span className="fw-bold ms-2">{email}</span>
//         </div>
//         <div className="d-flex">
//           <Card.Text className="fw-bold"> Gender: </Card.Text>
//           <span className="fw-bold ms-2">{gender}</span>
//         </div>
//         <div className="d-flex">
//           <Card.Text className="fw-bold"> Mobile: </Card.Text>
//           <span className="fw-bold ms-2">{mobileNumber}</span>
//         </div>
//         <hr
//           style={{ border: "1px solid #bfbfbf", width: "100%" }}
//         />
//         <div className="text-start">
//           <Button variant="secondary" onClick={openModal}>
//             Edit profile
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   )}

// {showProfileModal && (
//   <div
//     className="modal show"
//     style={{ display: "block", position: "initial" }}
//   >
//     <Modal.Dialog>
//       <Modal.Header closeButton>
//         <Modal.Title>Modal title</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <input
//           type="text"
//           placeholder="Firstname"
//           className="form-control mb-3"
//           defaultValue={profileData.firstName}
//           onChange={handleUpdates}
//           name="firstName"
//         />
//         <input
//           type="text"
//           placeholder="LastName"
//           className="form-control mb-3"
//           defaultValue={profileData.lastName}
//           onChange={handleUpdates}
//           name="lastName"
//         />
//         <input
//           type="text"
//           placeholder="Email"
//           className="form-control mb-3"
//           defaultValue={profileData.email}
//           disabled
//         />
//         <input
//           type="text"
//           placeholder="mobileNumber"
//           className="form-control mb-3"
//           defaultValue={profileData.mobileNumber}
//           onChange={handleUpdates}
//           name="mobileNumber"
//         />
//         <input
//           type="text"
//           placeholder="Gender"
//           className="form-control mb-3"
//           defaultValue={profileData.gender}
//           onChange={handleUpdates}
//           name="gender"
//         />
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={closeModal}>
//           Close
//         </Button>
//         <Button
//           variant="primary"
//           onClick={() => updateProfile(profileData.id)}
//         >
//           Update
//         </Button>
//       </Modal.Footer>
//     </Modal.Dialog>
//   </div>
// )}
// {/* </div> */}
// </Col>