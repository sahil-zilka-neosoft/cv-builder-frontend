import { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const ProfileModal = ({ user, isOpen, onClose }) => {
  console.log(user.name);
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
            <MDBModalBody>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={user.photo} // Assuming user.photo is the URL of the profile image
                  alt="Profile"
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              {/* Other modal body content */}
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

export default ProfileModal;
