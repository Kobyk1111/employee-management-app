import { Outlet } from "react-router-dom";
import EmployeeNavigation from "../EmployeeNavigation/EmployeeNavigation";
import "./EmployeeLayout.css";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import EmployeeDropDownProfile from "../EmployeeDropDownProfile/EmployeeDropDownProfile";

function EmployeeLayout() {
  const {
    state: { loggedInEmployee },
  } = useContext(DataContext);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="employee-layout-container">
      <EmployeeNavigation />
      <div className="employee-outlet">
        <div className="employee-subnav">
          <h3> {loggedInEmployee.companyName}</h3>
          <div className="user-profile" onClick={() => setOpenProfile((prev) => !prev)}>
            <h3>{loggedInEmployee.username}</h3>
            <img src={`/uploads/${loggedInEmployee.profilePicture}`} alt="profilePic" width={40} height={40} />
          </div>
          {openProfile && <EmployeeDropDownProfile setOpenProfile={setOpenProfile} />}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeLayout;
