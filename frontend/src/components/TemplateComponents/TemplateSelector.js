import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

const TemplateSelector = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleCardClick = (templateNumber) => {
    navigate(`/cv/create/${templateNumber}`);
    onClose(); // Close the modal after navigation
  };

  return (
    <>
      <MDBModal staticBackdrop tabIndex="-1" show={isOpen} onHide={onClose}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={onClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="d-flex flex-column align-items-center">
              <h5 className="mb-3">Select a template to create your CV</h5>

              <div className="row row-cols-1 row-cols-md-2 g-4">
                {/* Card 1 */}
                <div className="col">
                  {/* Card Body */}
                  <MDBCardBody>
                    {/* Card Content */}
                    {/* Add your content for Card 2 */}
                  </MDBCardBody>

                  {/* Card Footer */}
                  <MDBCardFooter className="d-grid">
                    <MDBBtn
                      className="btn btn-primary"
                      onClick={() => handleCardClick(1)}
                    >
                      Template Number 1
                    </MDBBtn>
                  </MDBCardFooter>
                </div>

                {/* Card 2 */}
                <div className="col">
                  {/* Card Body */}
                  <MDBCardBody>
                    {/* Card Content */}
                    {/* Add your content for Card 2 */}
                  </MDBCardBody>

                  {/* Card Footer */}
                  <MDBCardFooter className="d-grid">
                    <MDBBtn
                      className="btn btn-primary"
                      onClick={() => handleCardClick(2)}
                    >
                      Template Number 2
                    </MDBBtn>
                  </MDBCardFooter>
                </div>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={onClose}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default TemplateSelector;
