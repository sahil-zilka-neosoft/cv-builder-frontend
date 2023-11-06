import React, { useState } from "react";
import { Form, InputGroup, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/Features/userSlices/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confimpassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const handlePasswordShow = () => setShow(!show);
  //TODO: submit handler will take the user to the dashboard and if the user already show the respective toast
  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(signup({ name, email, password }));
      if (signup.fulfilled.match(response)) {
        // Registration successful, navigate to the dashboard
        console.log(response);
        navigate("/dashboard");
      } else {
        // Handle unsuccessful registration (e.g., display an error message)
        console.error("Registration failed:", response.error);
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("Error during registration:", error);
    }

    // Reset form fields
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
  };

  return (
    <Stack
      gap={2}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        style={{ margin: "5px", padding: "5px" }}
        onSubmit={signupSubmitHandler}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Password"
            />
            <Button variant="outline-secondary" onClick={handlePasswordShow}>
              {!show ? "Show" : "Hide"}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={show ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confimpassword}
              placeholder="Confirm Password"
            />
            <Button variant="outline-secondary">
              {!show ? "Show" : "Hide"}
            </Button>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Stack>
  );
};

export default SignUp;
