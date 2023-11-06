import React, { useRef, useState, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import MultiSelectInput from "../../common/MultiSelectInput";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setProjects } from "../../redux/Features/CVSlices/templateSlice";

const Projects = ({ onSave }) => {
  const options = ["Nodejs", "Express js", "MongoDB", "SQL", "Python", "Java"];
  const dispatch = useDispatch();
  const [projectList, setProjectList] = useState([]);
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    teamSize: "",
    duration: "",
    techStack: [],
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  const timeType = useRef("Years");
  const dayValue = useRef("");

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsFormComplete(Object.values(formData).every((field) => field !== ""));
  }, []);

  const handleTechStackChange = (selectedItems) => {
    const selectedTechStackValues = selectedItems.map((item) => item.value);
    setFormData((prevData) => ({
      ...prevData,
      techStack: selectedTechStackValues,
    }));
  };

  const handleAddMoreClick = () => {
    const newProject = {
      ...formData,
      duration: dayValue.current.value + " " + timeType.current.value,
      techStack: [...formData.techStack], // Preserve the existing techStack array
    };

    setProjectList((prevProjects) => [...prevProjects, newProject]);
    if (projectList.length > 0) {
      setIsFormComplete(true);
    }
    // Reset only specific fields, not the entire formData object
    setFormData((prevData) => ({
      ...prevData,
      projectTitle: "",
      projectDescription: "",
      teamSize: "",
      duration: "",
      techStack: [], // Clear techStack for the next entry if needed
    }));

    timeType.current.value = "Years";
    dayValue.current.value = "";
  };

  const handleSaveClick = () => {
    if (projectList.length !== 0 && isFormComplete) {
      dispatch(setProjects(projectList));
      onSave(projectList);
    } else {
      toast.info("Please enter some data");
    }
    setProjectList([]);
  };

  const handleRemoveProject = (index) => {
    setProjectList((prevProjects) =>
      prevProjects.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <Container>
        <h3>Project Details</h3>
        {projectList.map((project, index) => (
          <div key={index} className="project-box">
            <div>
              <h4>{project.projectTitle}</h4>
              <p>{project.projectDescription}</p>
              <p>Team Size: {project.teamSize}</p>
              <p>Duration: {project.duration}</p>
              <p>
                Tech Stack: {project.techStack.map((item) => item).join(", ")}
              </p>
            </div>
            <FaTrash
              className="trash-icon"
              onClick={() => handleRemoveProject(index)}
            />
          </div>
        ))}
        <Row>
          <Col>
            <input
              type="text"
              placeholder="Project Title"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter Project description"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Team Size"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleInputChange}
            />
            <MultiSelectInput
              options={options}
              onSelectionChange={handleTechStackChange}
            />
            <select ref={timeType}>
              <option>Years</option>
              <option>Days</option>
              <option>Months</option>
            </select>
            <input type="text" ref={dayValue} />
            <Button variant="primary" onClick={handleAddMoreClick}>
              Add More
            </Button>
            <Button
              variant="success"
              disabled={!isFormComplete}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Projects;
