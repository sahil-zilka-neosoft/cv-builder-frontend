import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSkills } from "../../redux/Features/CVSlices/templateSlice";
import { toast } from "react-toastify";

const skillsOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "Python",
  "Java",
]; // List of available skills

const Skills = ({ onSave }) => {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleAddSkill = () => {
    if (selectedSkill && rating) {
      const skillObject = {
        skillName: selectedSkill,
        rating: rating,
      };
      setSkillsList([...skillsList, skillObject]);
      if (skillsList.length !== 0) {
        setIsFormComplete(true);
      }
      // Reset form fields
      setSelectedSkill("");
      setRating("");
    }
  };

  const handleSave = () => {
    console.log("Skills List:", skillsList);
    if (skillsList.length !== 0 && isFormComplete) {
      dispatch(setSkills(skillsList));
      onSave(skillsList);
    } else {
      toast.info("Please enter some data");
    }
    // Clear skillsList for next entries if needed
    setSkillsList([]);
  };
  const handleRemoveSkill = (index) => {
    setSkillsList((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Container>
        <Row>
          <h4>Select Skills</h4>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select Skill</Form.Label>
                <Form.Control
                  as="select"
                  onChange={handleSkillChange}
                  value={selectedSkill}
                >
                  <option value="">Select a skill</option>
                  {skillsOptions.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rating (in percentage)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter rating"
                  value={rating}
                  onChange={handleRatingChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddSkill}>
                Add Skill
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
            <ul>
              {skillsList.map((skill, index) => (
                <li key={index}>
                  {skill.skillName} - {skill.rating}
                  <FaTrash
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveSkill(index)} // Assuming you have a function to remove an item at a specific index
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

export default Skills;
