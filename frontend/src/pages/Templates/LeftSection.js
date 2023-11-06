import React from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import "../../styles/TemplateStyles/leftsection.css"; // Import your CSS file
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removePerosnalDetails } from "../../redux/Features/CVSlices/templateSlice";

const LeftSection = ({
  personal = {}, // Default empty object for personal details
  eduList = [], // Default empty array for education list
  skillList = [], // Default empty array for skill list
  socialProfilesList = [], // Default empty array for social profiles list
  workExp = [], // Default empty array for work experience list
  projectsList = [], // Default empty array for projects list,
}) => {
  const {
    name,
    photo,
    phone,
    address,
    city,
    state,
    pincode,
    selfIntroduction,
  } = personal;

  const dispatch = useDispatch();
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    position: "relative",
    // Add other styles as needed
  };
  // Avoid using inline styling

  const handleDetailRemove = () => {
    dispatch(removePerosnalDetails());
  };

  return (
    <div className="cv-template">
      <Row>
        {/* Left Column */}
        <Col xs={12} md={8} className="left-column">
          <div
            style={{
              backgroundColor: "#D2B48C", // Light brown background color
              padding: "20px",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>{name ? name : "Name"}</h3>
            <p style={{ textAlign: "start" }}>
              {selfIntroduction ? selfIntroduction : "Lorem ipsum dummy text."}
            </p>
          </div>
          {/* Other sections of your CV */}
          <div className="work-exp-section">
            <h2>Work Experience</h2>
            {workExp.length > 0 ? (
              workExp.map((exp, index) => (
                <div className="work-exp-item" key={index}>
                  {/* ... (existing code for rendering work experience details) */}
                  <div className="exp-number">{index + 1}</div>
                  <div className="exp-details">
                    <h3>{exp.position}</h3>
                    <p>{exp.organizationName}</p>
                    <p>
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p>CTC: {exp.ctc}</p>
                    <p>On Notice Period: {exp.onNoticePeriod}</p>
                    <p>
                      Tech Stack: {exp.techStack.map((tech) => tech).join(", ")}
                    </p>
                    <p>Joining Location: {exp.joiningLocation}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No work experiences added yet.</p>
            )}
          </div>
          <div className="projects-section">
            <h3>Projects</h3>
            {projectsList.length > 0 ? (
              projectsList.map((projectObj, index) => (
                <div className="projectLists" key={index}>
                  <p className="fw-normal">{index + 1}</p>
                  <div className="projectDetails">
                    <p>Project Ttile : {projectObj.projectTitle}</p>
                    <p>Project Description{projectObj.projectDescription}</p>
                    <p>Duration{projectObj.duration}</p>
                    <p>Team Size :{projectObj.teamSize}</p>
                    <p>
                      Tech Stack:{" "}
                      {projectObj.techStack.map((tech) => tech).join(", ")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Project Added yet added yet.</p>
            )}
          </div>
        </Col>

        {/* Right Column */}

        <Col xs={12} md={4} className="right-column">
          <div className="basic-detail-container" style={style}>
            <div className="profile-image">
              <Image
                src={
                  photo ||
                  "https://res.cloudinary.com/dc9ukv1vl/image/upload/v1698579204/cld-sample.jpg"
                }
                roundedCircle
                className="image-circle"
              />
            </div>
            <div className="profile-details" style={{ position: "relative" }}>
              {phone ? (
                <p className="contact">{phone}</p>
              ) : (
                <p className="small">Phone</p>
              )}
              {address ? (
                <p className="address">{address}</p>
              ) : (
                <p className="small">Address</p>
              )}
              {city || state || pincode ? (
                <p className="address">
                  {city}, {state}, {pincode}
                </p>
              ) : (
                <p className="small">Location</p>
              )}
              {handleDetailRemove && (
                <FaTrash
                  color="red"
                  onClick={handleDetailRemove}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
          </div>
          <div className="social-profiles-container">
            <div className="title-container">
              <h3>Social Profiles</h3>
            </div>
            <div className="social-profiles">
              {socialProfilesList.map((profile, index) => (
                <a key={index} href={profile.link} className="profile-link">
                  {profile.title}
                </a>
              ))}
            </div>
          </div>
          <div className="eduDetails">
            <div className="title-container">
              <h3>Education</h3>
            </div>
            <div className="education-list">
              {eduList.length > 0 ? (
                eduList.map((education, index) => (
                  <div key={index} className="education-item">
                    <p className="fw-bolder">{education.university}</p>
                    <p>Degree: {education.degree}</p>
                    <p>Percentage: {education.percentage}</p>
                    <p>
                      {education.startDate} - {education.endDate}
                    </p>
                  </div>
                ))
              ) : (
                <p>No Educational details Added</p>
              )}
            </div>
          </div>
          <div className="skills">
            <div className="title-container">
              <h3>Skills</h3>
            </div>
            <div className="skillsList">
              {skillList.length > 0 ? (
                skillList.map((skillObj, index) => (
                  <div className="skillObj" key={index}>
                    <p className="fw-bolder">{skillObj.skillName}</p>
                    <p className="fw-normal">{skillObj.rating}</p>
                  </div>
                ))
              ) : (
                <p>No Skills Added</p>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LeftSection;
