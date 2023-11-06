import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setPerosnalDetails } from "../../redux/Features/CVSlices/templateSlice";

const BasicDetails = ({ onSave, templateNumber }) => {
  const [postingPic, setPostingPic] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [basicDetail, setBasicDetail] = useState({
    name: "",
    photo: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    selfIntroduction: "",
  });

  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(basicDetail);
    if (basicDetail === undefined || null) {
      toast.error("Please fill all the fields");
      return;
    }
    console.log({
      personal: basicDetail,
      template: { templateNumber },
      title: basicDetail.name + " 's CV",
    });
    dispatch(
      setPerosnalDetails({
        personal: basicDetail,
        template: templateNumber,
        title: basicDetail.name + " 's CV",
      })
    );
    onSave(basicDetail);
    setBasicDetail({
      name: "",
      photo: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      city: "",
      pincode: "",
      selfIntroduction: "",
    });
    // Handle form submission logic here
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBasicDetail((prevBasicDetail) => ({
      ...prevBasicDetail,
      [name]: value,
    }));
  };
  const postDetails = (pic) => {
    setPostingPic(true);
    console.log({ Pic: pic });
    if (pic === undefined) {
      toast.error("Please select an image to upload");
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const photoData = new FormData();
      photoData.append("file", pic);
      photoData.append("upload_preset", "chat-app");
      photoData.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: photoData,
      })
        .then((res) => res.json())
        .then((data) => {
          setBasicDetail((prevBasicDetail) => ({
            ...prevBasicDetail,
            photo: data.secure_url.toString(),
          }));
          setPostingPic(false);
        })
        .catch((err) => {
          console.log(err);
          setPostingPic(false);
        });
    } else {
      toast.error("Please select and image to upload");
      setPostingPic(false);
      return;
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={basicDetail.name}
            placeholder="Enter your name"
            onChange={(e) => handleFormChange(e)}
            name="name"
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Photo
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="email"
            value={basicDetail.email}
            placeholder="Enter your email"
            onChange={(e) => handleFormChange(e)}
            name="email"
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Phone
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            pattern="[0-9]{10}"
            required
            name="phone"
            value={basicDetail.phone}
            onChange={(e) => handleFormChange(e)}
          />
          <Form.Text muted>
            Please enter a 10-digit phone number without dashes or spaces.
          </Form.Text>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Address
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={basicDetail.address}
            name="address"
            placeholder="Enter your address"
            onChange={(e) => handleFormChange(e)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          State
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="state"
            value={basicDetail.state}
            placeholder="Enter state"
            onChange={(e) => handleFormChange(e)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          City
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="city"
            value={basicDetail.city}
            placeholder="Enter your city"
            onChange={(e) => handleFormChange(e)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Pincode
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="pincode"
            value={basicDetail.pincode}
            placeholder="Enter pincode"
            onChange={(e) => handleFormChange(e)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Small introduction
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            rows={3}
            name="selfIntroduction"
            type="text"
            placeholder="Small introduction"
            value={basicDetail.selfIntroduction}
            onChange={(e) => handleFormChange(e)}
            required
          />
        </Col>
      </Form.Group>

      {/* Add more form fields (address, city, pincode, state, self-introduction) similarly */}

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default BasicDetails;
