import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getOneCV,
  setCVClean,
  setCVReading,
} from "../redux/Features/CVSlices/templateSlice";
import { ToastContainer, toast } from "react-toastify";
import LeftSection from "./Templates/LeftSection";
import TemplateTwo from "./Templates/TemplateTwo";
import { MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CVReader = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { id, templateNumber } = useParams();
  const selectedCVMain = useSelector((state) => state.template.cvmain);
  const [selectedTemplate, setSelectedTemplate] = useState(templateNumber);
  const localToken = localStorage.getItem("token");
  const token = localToken.replace(/^"(.*)"$/, "$1");

  // Secondary state updates
  const isCreating = useSelector((state) => state.template.isCreating);
  const isEditing = useSelector((state) => state.template.isEditing);
  const isReading = useSelector((state) => state.template.isReading);
  const loading = useSelector((state) => state.template.loading);
  const sliceMessage = useSelector((state) => state.template.message);
  const sliceError = useSelector((state) => state.template.error);

  useEffect(() => {
    if (id) {
      // If there is an id in the params, fetch CV data
      dispatch(getOneCV({ token, id }));
      setSelectedTemplate(selectedCVMain.template);
      readTheCv();
    } else if (templateNumber) {
      // If there is a templateNumber in the params, set the selectedTemplate
      dispatch(setCVClean());
      setSelectedTemplate(templateNumber);
    }
  }, []);

  const readTheCv = async () => {
    if (selectedCVMain) {
      dispatch(setCVReading());
    } else {
      toast.error({ sliceError });
    }
    toast.info(`🦄 ${sliceMessage}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const downloadPDF = () => {
    const capture = document.querySelector("#main-cv");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "pt", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save(`${selectedCVMain.title}`);
    });
    toast.info(`🦄 Your CV is downloaded`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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

  const editOneCV = () => {};

  return (
    <div style={{ position: "relative" }}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
      <div
        style={{
          flex: "1",
          padding: "20px",
          overflowY: "auto",
          maxHeight: "100vh", // Adjust the height as needed
        }}
        id="main-cv"
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <MDBSpinner role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        ) : (
          selectedTemplateComponent
        )}
      </div>
      <MDBBtn
        rounded
        className="mx-2"
        color="success"
        style={{
          position: "absolute",
          top: "10px", // Adjust the top position as needed
          right: "10px", // Adjust the right position as needed
        }}
        onClick={downloadPDF}
        disabled={!(loader === false)}
      >
        Download this CV
      </MDBBtn>
      <Link to={`/cv/edit/${id}`}>
        <MDBBtn
          rounded
          className="mx-2"
          color="info"
          style={{
            position: "absolute",
            top: "50px", // Adjust the top position as needed
            right: "10px", // Adjust the right position as needed
          }}
          onClick={editOneCV}
        >
          Edit this CV
        </MDBBtn>
      </Link>
    </div>
  );
};

export default CVReader;
