import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import CommonModals from "../../common/CommonModals";
import { useDispatch } from "react-redux";
import {
  setCVEditing,
  setCVReading,
} from "../../redux/Features/CVSlices/templateSlice";

const CVCard = ({ cvs }) => {
  const dispatch = useDispatch();
  const [selectedCV, setSelectedCV] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = (cv, e) => {
    e.stopPropagation(); // Prevent event propagation
    setSelectedCV(cv); // Set the selected CV data when the delete button is clicked
    openDeleteModal();
  };
  const openDeleteModal = () => setDeleteModalOpen(true);
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      {cvs.map((cv) => (
        <div key={cv._id} className="col">
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
                src={cv.personal.photo} // Assuming cv.personal.photo contains the image URL
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
              <MDBCardTitle>{cv.title}</MDBCardTitle>
              <MDBCardText>{cv.personal.name}</MDBCardText>
              {/* Add more card details if needed */}
              {/* Icon Buttons */}
              <div className="d-flex justify-content-around mt-3">
                <Link to={`/cv/view/${cv._id}`}>
                  {/* dispatch and carry forward the status of the file */}
                  <FaEye
                    style={{ color: "green", cursor: "pointer" }}
                    size="25px"
                    onClick={() => dispatch(setCVReading)}
                  />
                </Link>
                <Link to={`/cv/edit/${cv._id}`}>
                  {/* dispatch and carry forward the status of the file */}
                  <FaEdit
                    style={{ color: "blue", cursor: "pointer" }}
                    size="20px"
                    onClick={() => dispatch(setCVEditing)}
                  />
                </Link>
                <FaTrash
                  style={{ color: "red", cursor: "pointer", marginTop: "3px" }}
                  onClick={(e) => handleDeleteClick(cv, e)}
                  size="20px"
                />
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      ))}
      <div>
        <CommonModals
          isOpen={isDeleteModalOpen}
          cv={selectedCV}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedCV(null);
          }}
        />
      </div>
    </div>
  );
};

export default CVCard;
