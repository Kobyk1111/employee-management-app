import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { MdPeopleAlt } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { SiOnlyoffice } from "react-icons/si";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Navigation() {
  const {
    state: { loggedInAdmin },
  } = useContext(DataContext);
  return (
    <nav className="navigation">
      <div className="nav-info">
        <h3>Administrator</h3>
        <img src={`/${loggedInAdmin.profilePicture}` || loggedInAdmin.profilePicture} alt="" width={140} height={140} />
      </div>
      <ul>
        <li>
          <NavLink to="/admin/dashboard">
            <MdDashboard />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/departments">
            <SiOnlyoffice />
            Departments
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/employees">
            <MdPeopleAlt />
            Employees
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/leave">
            <FaRegCalendarDays />
            Leave
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
