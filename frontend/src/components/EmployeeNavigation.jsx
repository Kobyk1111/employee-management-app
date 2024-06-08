import { NavLink } from "react-router-dom";

function EmployeeNavigation() {
  return (
    <div>
      <nav>
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
