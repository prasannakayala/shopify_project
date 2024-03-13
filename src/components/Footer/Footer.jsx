import React from "react";
import "./Footer.css";
import { Card, Col, Container, Row, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer-container bg-dark p-4">
      <Container>
        <Row direction="horizontal" gap={1}>
          <Col>
            <Card className="bg-dark text-light border border-0 text-start">
              <h5>About Company</h5>
              <small className="footer-text">
                Shopify is here at your quick and easy service for Shopping
              </small>
              <small>Contact Information</small>
              <small>Email: contact@Shopify.com</small>
              <small>Phone: +91 9884318888</small>
              <small>Mumbai, India</small>
            </Card>
          </Col>
          <Col>
            <Card className="bg-dark text-light border border-0 text-start">
              <h5>Information</h5>
              <small>Terms and Conditions</small>
              <small>Gaurantee and Return Policy</small>
              <small>Contact Us</small>
              <small>Privacy Policy</small>
              <small>Locate Us</small>
            </Card>
          </Col>
          <Col>
            <Card className="bg-dark text-light border border-0 text-start">
              <h5>News Letter</h5>
              <small className="footer-text">
                Signup to get exclusive offer from our favourite brands and to
                be sale up in the news
              </small>
              <input
                type="text"
                placeholder="Your Email..."
                className="w-50 mt-3"
              />
              <div>
                <Button variant="light" className="mt-2">
                  Subscribe
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        <Card.Footer className="text-white mt-4">
          <small>&copy; 2023 Shopify | All rights reserved | Terms Of Service | Privacy</small>
        </Card.Footer>
      </Container>
    </div>
  );
};

export default Footer;
