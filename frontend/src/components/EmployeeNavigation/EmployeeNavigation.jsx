import { NavLink } from "react-router-dom";
import "./EmployeeNavigation.css";
import { MdDashboard } from "react-icons/md";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function EmployeeNavigation() {
  const {
    state: { loggedInEmployee },
  } = useContext(DataContext);

  return (
    // <div>
    <nav className="employee-navigation">
      <div className="nav-info">
        <h3>{loggedInEmployee.jobTitle}</h3>
        <img
          src={`/${loggedInEmployee.profilePicture}` || loggedInEmployee.profilePicture}
          alt=""
          width={140}
          height={140}
        />
      </div>
      <ul>
        <li>
          <NavLink to="/employee/dashboard">
            <MdDashboard />
            Dashboard
          </NavLink>
        </li>
        {/* <li>
            <NavLink to="/employee/profile">Profile</NavLink>
          </li> */}
        <li>
          <NavLink to="/employee/leave">
            <FaRegCalendarDays />
            Leave
          </NavLink>
        </li>
      </ul>
    </nav>
    // </div>
  );
}

export default EmployeeNavigation;
