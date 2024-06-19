import { NavLink, Outlet } from "react-router-dom";
import "./EmployeeProfileLayout.css";

function EmployeeProfileLayout() {
  return (
    <div className="employee-profile-layout-container">
      <nav className="navigation">
        <ul>
          <li>
            <NavLink to="/employee/profile/account" end>
              Account Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/employee/profile/account/password">Change Password</NavLink>
          </li>
        </ul>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeProfileLayout;
