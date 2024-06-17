import { NavLink } from "react-router-dom";
import "./EmployeeNavigation.css";

function EmployeeNavigation() {
  return (
    <div>
      <nav className="employee-navigation">
        <div>
          <img src="" alt="" />
          <h3>Employee</h3>
        </div>
        <ul>
          <li>
            <NavLink to="/employee/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/employee/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/employee/leave">Leave</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default EmployeeNavigation;
