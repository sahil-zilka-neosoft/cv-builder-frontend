import React, { useState, useEffect } from "react";
import { Container, Nav, Tab, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "../Auth/SignUp";
import { useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
// Import your SignUp component
// Import your Login component

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("token"));
    if (userToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState("login");

  return (
    <Container className="mt-5">
      <Tab.Container
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
      >
        <Row>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="signup">Signup</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="login">Login</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Tab.Content>
            <Tab.Pane eventKey="signup">
              <SignUp />
            </Tab.Pane>
            <Tab.Pane eventKey="login">
              <Login />
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default HomePage;
