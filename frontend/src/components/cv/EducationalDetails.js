import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { setEducation } from "../../redux/Features/CVSlices/templateSlice";
import { toast } from "react-toastify";

const EducationalDetails = ({ onSave }) => {
  const [educationData, setEducationData] = useState({
    university: "",
    degree: "",
    startDate: null,
    endDate: null,
    percentage: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  const dispatch = useDispatch();

  const [educationalDetails, setEducationalDetails] = useState([]);

  const handleChange = (e) => {
    setEducationData({
      ...educationData,
      [e.target.name]: e.target.value,
    });
    setIsFormComplete(
      Object.values(educationData).every((field) => field !== "")
    );
  };

  const handleStartDateChange = (date) => {
    setEducationData({ ...educationData, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setEducationData({ ...educationData, endDate: date });
  };

  const handleItemRemove = (index) => {
    const newEdDetailsList = [...educationalDetails];
    newEdDetailsList.splice(index, 1);
    setEducationalDetails(newEdDetailsList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert dates to string format for storage
    const formattedData = {
      ...educationData,
      startDate: educationData.startDate?.toLocaleDateString(),
      endDate: educationData.endDate?.toLocaleDateString(),
    };
    setEducationalDetails([...educationalDetails, formattedData]);
    if (EducationalDetails.length > 0) {
      setIsFormComplete(true);
    }
    // Clear the form fields
    setEducationData({
      university: "",
      degree: "",
      startDate: null,
      endDate: null,
      percentage: "",
    });
  };
  const handleSave = () => {
    console.log(educationalDetails);
    if (educationalDetails && isFormComplete) {
      dispatch(setEducation(educationalDetails));
      onSave(educationalDetails);
    } else {
      toast.info("Please enter more details to display");
    }
    setEducationalDetails([]);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="university">
          <Form.Label>University / School</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter university or school Name"
            name="university"
            value={educationData.university}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="degree">
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter degree"
            name="degree"
            value={educationData.degree}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            selected={educationData.startDate}
            onChange={handleStartDateChange}
            className="form-control"
            placeholderText="Select start date"
            dateFormat="dd/MM/yyyy"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <DatePicker
            selected={educationData.endDate}
            onChange={handleEndDateChange}
            className="form-control"
            placeholderText="Select end date"
            dateFormat="dd/MM/yyyy"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="percentage">
          <Form.Label>Percentage</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter percentage"
            name="percentage"
            value={educationData.percentage}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Education
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          disabled={!isFormComplete}
        >
          Save
        </Button>
      </Form>

      <Container className="mt-4">
        <h2>Educational Details</h2>
        <Row>
          {educationalDetails.map((detail, index) => (
            <Col key={index} md={4} className="mb-2">
              <div className="border p-3 position-relative">
                <h5>{index + 1}</h5>
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleItemRemove(index)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    color: "red",
                    fontSize: "15px",
                    cursor: "pointer",
                    right: "15px",
                  }}
                />
                <p>University: {detail.university}</p>
                <p>Degree: {detail.degree}</p>
                <p>Start Date: {detail.startDate}</p>
                <p>End Date: {detail.endDate}</p>
                <p>Percentage: {detail.percentage}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default EducationalDetails;
