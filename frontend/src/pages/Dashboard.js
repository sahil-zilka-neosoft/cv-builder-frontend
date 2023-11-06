import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Features/userSlices/userSlice";
import { toast } from "react-toastify";
import ProfileModal from "../common/ProfileModal";
import TileComponent from "../components/TileComponent";
import { getMyCVs } from "../redux/Features/CVSlices/cvSlice";
import CVCard from "../components/TemplateComponents/CVCard";

const LeftSection = lazy(() => import("./Templates/LeftSection"));
const TemplateTwo = lazy(() => import("./Templates/TemplateTwo"));

const Dashboard = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const cvList = useSelector((state) => state.cv.list);

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const localToken = localStorage.getItem("token");

  useEffect(() => {
    if (localToken) {
      dispatch(getMyCVs({ token: localToken.replace(/^"(.*)"$/, "$1") }));
    }
  }, [dispatch, localToken]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    toast.success("User Logged out");
    navigate("/"); // To keep the user jor
  };

  return (
    <>
      <header>
        {/* Main Navigation */}
        <MDBNavbar expand="lg" light className="bg-white">
          {/* Container wrapper */}
          <MDBContainer fluid>
            <hr />
            <MDBTypography variant="h3">CV Builder</MDBTypography>
            {/* Right links */}
            <MDBNavbarNav className="d-flex flex-row" right fullWidth={false}>
              {/* Avatar */}
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    className="hidden-arrow d-flex align-items-center nav-link"
                  >
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                      className="rounded-circle"
                      height="30"
                      alt="Avatar"
                      loading="lazy"
                    />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem onClick={openProfileModal}>
                      MyProfile
                    </MDBDropdownItem>
                    <MDBDropdownItem onClick={handleLogout}>
                      Logout
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>

        {/* Heading */}
        <div className="p-5 bg-light mb-4">
          <h1>Dashboard</h1>
          {/* Breadcrumb */}
          <MDBContainer fluid>
            <MDBBreadcrumb bold>
              <MDBBreadcrumbItem>
                <a href="" className="text-reset">
                  Home
                </a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="" className="text-reset">
                  Analytics
                </a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="" className="text-reset">
                  <u>Dashboard</u>
                </a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBContainer>
        </div>
      </header>
      <ProfileModal
        user={user}
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
      <h4>Showing CVs</h4>
      {/* // TODO : one component tile with a plus overlay sign which will open the CV editor/ to a modal to choose the template then from there open the editor with the selected template */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* <LeftSection /> TEMPLATE ONE */}
        {/* <TemplateTwo /> */}
        <MDBContainer fluid className="d-flex align-items-center mb-4">
          <TileComponent />
          <CVCard cvs={cvList} />
        </MDBContainer>
      </Suspense>
    </>
  );
};

export default Dashboard;
