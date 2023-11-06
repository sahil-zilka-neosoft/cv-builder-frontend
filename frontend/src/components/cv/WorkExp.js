import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MultiSelectInput from "../../common/MultiSelectInput";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setExperience } from "../../redux/Features/CVSlices/templateSlice";

const WorkExp = ({ onSave }) => {
  const [workExp, setWorkExp] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    organizationName: "",
    startDate: new Date(),
    endDate: new Date(),
    ctc: "",
    onNoticePeriod: false,
    techStack: [],
    joiningLocation: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStartDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      endDate: date,
    }));
  };

  const handleTechStackChange = (selectedItems) => {
    const selectedTechStackValues = selectedItems.map((item) => item.value);
    setFormData((prevData) => ({
      ...prevData,
      techStack: selectedTechStackValues,
    }));
  };

  const handleAddMore = () => {
    if (formData) {
      setWorkExp([...workExp, formData]);
    }
    if (workExp.length > 0) {
      setIsFormComplete(true);
    }
    // Reset form fields
    setFormData({
      position: "",
      organizationName: "",
      startDate: new Date(),
      endDate: new Date(),
      ctc: "",
      onNoticePeriod: false,
      techStack: [],
      joiningLocation: "",
    });
  };

  const handleSave = () => {
    if (workExp.length !== 0 && isFormComplete) {
      const serializedWorkExp = workExp.map((exp) => ({
        ...exp,
        startDate: exp.startDate.toISOString(),
        endDate: exp.endDate.toISOString(),
      }));
      dispatch(setExperience(serializedWorkExp));
      onSave(serializedWorkExp);
      console.log({
        "New data List": serializedWorkExp,
        message: "sending to parent",
      });
    }
    // Clear workExp list for next entries if needed
    setWorkExp([]);
  };

  const handleRemoveWorkExp = (index) => {
    setWorkExp((prevWork) => prevWork.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter organization name"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={handleStartDateChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={handleEndDateChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CTC</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter CTC"
                  name="ctc"
                  value={formData.ctc}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="On Notice Period"
                  name="onNoticePeriod"
                  checked={formData.onNoticePeriod}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tech Stack</Form.Label>
                <MultiSelectInput
                  options={[
                    "React",
                    "Node.js",
                    "MongoDB",
                    "Express",
                    "JavaScript",
                    "HTML",
                    "CSS",
                  ]}
                  onSelectionChange={handleTechStackChange}
                  selectedItems={formData.techStack}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Joining Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter joining location"
                  name="joiningLocation"
                  value={formData.joiningLocation}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddMore}>
                Add More
              </Button>
              <Button
                variant="success"
                disabled={!isFormComplete}
                onClick={handleSave}
              >
                Save
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Work Experience List</h2>
            <ul>
              {workExp.map((exp, index) => (
                <li key={index}>
                  {exp.position} at {exp.organizationName} -{" "}
                  {exp.startDate.toDateString()} to {exp.endDate.toDateString()}
                  <FaTrash
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveWorkExp(index)} // Assuming you have a function to remove an item at a specific index
                  />
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WorkExp;
