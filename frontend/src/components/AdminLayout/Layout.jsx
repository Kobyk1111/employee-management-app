import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Layout.css";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import DropDownProfile from "../DropDownProfile/DropDownProfile";

function Layout() {
  const {
    state: { loggedInAdmin },
  } = useContext(DataContext);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="admin-layout-container">
      <Navigation />
      <div className="admin-outlet">
        <div className="admin-subnav">
          <h3> {loggedInAdmin.companyName}</h3>
          <div className="user-profile" onClick={() => setOpenProfile((prev) => !prev)}>
            <h3>{loggedInAdmin.username}</h3>
            <img src={loggedInAdmin.profilePicture} alt="profilePic" width={40} height={40} />
          </div>
          {openProfile && <DropDownProfile setOpenProfile={setOpenProfile} />}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
