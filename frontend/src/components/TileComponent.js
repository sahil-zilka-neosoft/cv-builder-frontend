import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import TemplateSelector from "./TemplateComponents/TemplateSelector";

const TileComponent = () => {
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);

  return (
    <>
      <MDBCard
        style={{
          width: "250px",
          height: "max-content",
          margin: "10px",
          padding: "20px",
          border: "2px solid #007bff",
          borderRadius: "10px",
        }}
      >
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
          style={{ width: "100%", height: "100%" }}
        >
          <MDBCardImage
            src="https://res.cloudinary.com/dc9ukv1vl/image/upload/v1698579225/CV%20builder/dikddcedxqrayeiyymcd.webp"
            alt="..."
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <a>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </a>
        </MDBRipple>
        <MDBCardBody style={{ textAlign: "center" }}>
          <MDBBtn onClick={() => setIsTemplateSelectorOpen(true)}>
            Create your CV
          </MDBBtn>
        </MDBCardBody>
        <TemplateSelector
          onClose={() => setIsTemplateSelectorOpen(false)}
          isOpen={isTemplateSelectorOpen}
        />
      </MDBCard>
    </>
  );
};

export default TileComponent;
