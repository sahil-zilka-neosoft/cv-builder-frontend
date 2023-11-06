import React, { useEffect, useState, useRef } from "react";
import BasicDetails from "../components/cv/BasicDetails";
import EducationalDetails from "../components/cv/EducationalDetails";
import Projects from "../components/cv/Projects";
import SocialLinks from "../components/cv/SocialLinks";
import WorkExp from "../components/cv/WorkExp";
import Skills from "../components/cv/Skills";
import { useNavigate, useParams } from "react-router-dom";
import LeftSection from "./Templates/LeftSection";
import { useDispatch, useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { useReactToPrint } from "react-to-print";
import {
  createOneCV,
  deleteOneCV,
  getOneCV,
  setCVClean,
  setCVEditing,
  setCVReading,
  updateOneCV,
} from "../redux/Features/CVSlices/templateSlice";
import { ToastContainer, toast } from "react-toastify";
import TemplateTwo from "./Templates/TemplateTwo";

// import Template from "./Template"; // Your Template component

const CVEditor = () => {
  const dispatch = useDispatch();
  const cvComponent = useRef();
  const { id, templateNumber } = useParams();
  const selectedCVMain = useSelector((state) => state.template.cvmain);
  const [selectedTemplate, setSelectedTemplate] = useState(templateNumber);
  const localToken = localStorage.getItem("token");
  const token = localToken.replace(/^"(.*)"$/, "$1");
  useEffect(() => {
    if (id) {
      // If there is an id in the params, fetch CV data
      dispatch(getOneCV({ token, id }));
    } else if (templateNumber) {
      // If there is a templateNumber in the params, set the selectedTemplate
      dispatch(setCVClean());
      setSelectedTemplate(templateNumber);
    }
  }, []);

  // Update selectedTemplate when selectedCVMain changes
  useEffect(() => {
    if (selectedCVMain && selectedCVMain.template) {
      setSelectedTemplate(selectedCVMain.template);
    }
  }, [selectedCVMain]);

  const [basicDetails, setBasicDetails] = useState({});
  const [educationalDetails, setEducationalDetails] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [workExp, setWorkExp] = useState([]);

  const navigate = useNavigate();

  const isCreating = useSelector((state) => state.template.isCreating);
  const isEditing = useSelector((state) => state.template.isEditing);
  const isReading = useSelector((state) => state.template.isReading);
  const loading = useSelector((state) => state.template.loading);
  const sliceMessage = useSelector((state) => state.template.message);
  const sliceError = useSelector((state) => state.template.error);

  const personalDetail = useSelector(
    (state) => state.template.cvmain?.personal ?? {}
  );
  const eduDetails = useSelector(
    (state) => state.template.cvmain?.education ?? []
  );
  const socialProfilesList = useSelector(
    (state) => state.template.cvmain?.socialProfiles ?? []
  );
  const projectList = useSelector(
    (state) => state.template.cvmain?.projects ?? []
  );
  const skillsList = useSelector(
    (state) => state.template.cvmain?.skills ?? []
  );
  const workExpList = useSelector(
    (state) => state.template.cvmain?.experience ?? []
  );

  const template = useSelector(
    (state) => state.template.cvmain?.template ?? ""
  );
  const title = useSelector((state) => state.template.cvmain?.title ?? "");

  const saveTheCV = async (e) => {
    e.preventDefault();
    const cvData = {
      personal: personalDetail,
      education: eduDetails,
      skills: skillsList,
      experience: workExpList,
      socialProfiles: socialProfilesList,
      projects: projectList,
      title,
      template: selectedTemplate,
    };
    console.log(cvData);
    // Check if any of the properties inside cvData are empty objects
    const emptyProperties = Object.entries(cvData).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else if (typeof value === "object" && value !== null) {
        return Object.keys(value).length === 0;
      }
      return false;
    });

    console.log("Empty Properties:", emptyProperties);

    if (emptyProperties.length > 0) {
      toast.error(`🦄 "Please fill all the details`, {
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
      // If cvData is not empty, dispatch the action and update the CV
      await dispatch(updateOneCV({ cvData, token }));
      toast.success(`🦄 ${sliceMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/dashboard");
    }
  };

  const deleteTheCV = async () => {
    if (selectedCVMain) {
      dispatch(deleteOneCV({ token, id }));
      toast.info({ sliceMessage });
      console.log(sliceMessage);
      navigate("/dashboard");
    } else {
      toast.error({ sliceError });
    }
    toast.warning(`🦄 ${sliceMessage}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const updateOneCV = async () => {
    const cvData = {
      personal: basicDetails,
      education: educationalDetails,
      skills: skills,
      experience: workExp,
      socialProfiles: socialLinks,
      projects: projects,
      title: basicDetails.name + " 's CV",
      template: selectedTemplate,
    };
    if (cvData) {
      dispatch(updateOneCV({ cvData, token, id }));
      console.log("data posted");
    } else {
      toast.error("Please enter all details");
    }
    toast.info(`🦄 ${sliceMessage}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/dashoboard");
  };
  const createOneCV = async () => {
    console.log("hitting the cv");
    const cvData = {
      personal: basicDetails,
      education: educationalDetails,
      skills: skills,
      experience: workExp,
      socialProfiles: socialLinks,
      projects: projects,
      title: basicDetails.name + " 's CV",
      template: selectedTemplate,
    };
    if (cvData) {
      dispatch(createOneCV({ cvData, token }));
      console.log("data posted");
    } else {
      toast.error("Please enter all details");
    }
    toast.info(`🦄 ${sliceMessage}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/dashoboard");
  };
  const selectedTemplateComponent =
    selectedTemplate === "1" ? (
      <LeftSection
        personal={selectedCVMain?.personal}
        eduList={selectedCVMain?.education}
        skillList={selectedCVMain?.skills}
        socialProfilesList={selectedCVMain?.socialProfiles}
        workExp={selectedCVMain?.experience}
        projectsList={selectedCVMain?.projects}
      />
    ) : selectedTemplate === "2" ? (
      <TemplateTwo
        personal={selectedCVMain?.personal}
        eduList={selectedCVMain?.education}
        skillList={selectedCVMain?.skills}
        socialProfilesList={selectedCVMain?.socialProfiles}
        workExp={selectedCVMain?.experience}
        projectsList={selectedCVMain?.projects}
      />
    ) : null;

  return (
    <div style={{ display: "flex" }}>
      {/* Left Section */}
      <div
        style={{
          flex: "1",
          padding: "20px",
          overflowY: "auto",
          maxHeight: "100vh", // Adjust the height as needed
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <BasicDetails
          onSave={setBasicDetails}
          templateNumber={selectedTemplate}
        />
        <EducationalDetails onSave={setEducationalDetails} />
        <Projects onSave={setProjects} />
        <Skills onSave={setSkills} />
        <SocialLinks onSave={setSocialLinks} />
        <WorkExp onSave={setWorkExp} />
      </div>

      {/* Right Section - Template */}
      <div style={{ flex: "1", padding: "20px" }}>
        <MDBBtn
          className="me-1"
          color="success"
          style={{
            position: "absolute",
            top: 10,
            right: 350,
            margin: "10px",
          }}
          onClick={saveTheCV}
          // disabled={readTheCv}
        >
          {isEditing ? "Save your CV" : "Edit your CV"}
        </MDBBtn>
        <MDBBtn
          className="me-1"
          color="success"
          style={{
            position: "absolute",
            top: 10,
            right: 350,
            margin: "10px",
          }}
          onClick={createOneCV}
          // disabled={readTheCv}
        >
          Save the CV
        </MDBBtn>

        <div>{selectedTemplateComponent}</div>
      </div>
    </div>
  );
};

export default CVEditor;
