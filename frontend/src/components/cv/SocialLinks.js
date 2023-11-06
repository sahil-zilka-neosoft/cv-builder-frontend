import React, { useState } from "react";
import { Form, Button, Col, Container, Row, InputGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSocialProfiles } from "../../redux/Features/CVSlices/templateSlice";
import { toast } from "react-toastify";

const SocialLinks = ({ onSave }) => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [linkData, setLinkData] = useState({
    title: "",
    link: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddLink = async () => {
    if (linkData.title && linkData.link) {
      await setSocialLinks([...socialLinks, linkData]);
      if (socialLinks.length > 0) {
        setIsFormComplete(true);
      }
      setLinkData({
        title: "",
        link: "",
      });
    }
  };

  const handleSave = () => {
    console.log(socialLinks);
    // got the links
    if (socialLinks.length !== 0 && isFormComplete) {
      dispatch(setSocialProfiles(socialLinks));
      onSave(socialLinks);
    } else {
      toast.info("Please enter some data");
    }
    setSocialLinks([]);
  };

  const handleRemove = (index) => {
    setSocialLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Container>
        <Row>
          <h2>Social Links</h2>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={linkData.title}
                  onChange={handleInputChange}
                />
                <Form.Text id="titleHelpBlock" muted>
                  You can enter Title as Github, LinkedIn, Twitter one at a time
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Link</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3">
                    {linkData.title}
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter link"
                    name="link"
                    value={linkData.link}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
              <Button variant="primary" onClick={handleAddLink}>
                Add Link
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
              {socialLinks.map((link, index) => (
                <li key={index}>
                  {link.title} - {link.link}
                  <FaTrash
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemove(index)} // Assuming you have a function to remove an item at a specific index
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

export default SocialLinks;
