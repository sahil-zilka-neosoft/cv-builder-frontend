import React, { useState, useEffect } from "react";
import { Form, InputGroup, Stack, Spinner, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Features/userSlices/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Corrected variable name
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordShow = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(login({ email, password })).unwrap();

      if (response.user && response.token) {
        // Redirect to dashboard if user is logged in successfully
        navigate("/dashboard");
        toast.success("User Logged in successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // Show error toast if login fails
        toast.error("Email or password is incorrect");
      }
    } catch (error) {
      // Show error toast if there's any network issue
      toast.error("Network error occurred. Please try again.");
    }
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
      <ToastContainer />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Form style={{ margin: "5px", padding: "5px" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Button variant="primary" type="submit">
            Login
          </Button>
          {error ? <p className="font-monospace">{error}</p> : null}
          {/* {user ? <Navigate to={"/dashboard"} replace={true} /> : null} */}
        </Form>
      )}
    </Stack>
  );
};

export default Login;
