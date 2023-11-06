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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOneCV } from "../redux/Features/CVSlices/templateSlice";
import { ToastContainer, toast } from "react-toastify";

const CommonModals = ({ cv = {}, isOpen, onClose }) => {
  console.log(cv);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliceMessage = useSelector((state) => state.template.message);
  const sliceError = useSelector((state) => state.template.error);
  const localToken = localStorage.getItem("token");
  const token = localToken.replace(/^"(.*)"$/, "$1");
  const handleCardDelete = async () => {
    if (cv && cv._id) {
      try {
        await dispatch(deleteOneCV({ token, id: cv._id }));
        // If the delete operation is successful, show success toast and navigate to dashboard
        toast.success(sliceMessage);
        window.location.reload(); // Reload the current page
      } catch (error) {
        // If there's an error during delete, show error toast
        toast.error(sliceError || "An error occurred while deleting the CV.");
      }
    } else {
      // If CV data is invalid, show error toast
      toast.error("Invalid CV data.");
    }
  };

  return (
    <>
      <div>
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
      </div>
      {/* Same as */}
      <ToastContainer />
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
              <h5 className="mb-3">Are you sure you want to delete your CV</h5>

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
                    <MDBBtn color="secondary" onClick={onClose}>
                      Close
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

                  {/* Card Footer  , [ dispatch actions to update the state of the template*/}
                  <MDBCardFooter className="d-grid">
                    <MDBBtn
                      className="btn btn-primary"
                      onClick={() => handleCardDelete()}
                    >
                      Delete
                    </MDBBtn>
                  </MDBCardFooter>
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CommonModals;
