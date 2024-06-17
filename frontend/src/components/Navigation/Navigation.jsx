import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    // <div className="navigation">
    <nav className="navigation">
      <div>
        <img src="" alt="" />
        <h3>Administrator</h3>
      </div>
      <ul>
        <li>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/departments">Departments</NavLink>
        </li>
        <li>
          <NavLink to="/admin/employees">Employees</NavLink>
        </li>
        <li>
          <NavLink to="/admin/leave">Leave</NavLink>
        </li>
      </ul>
    </nav>
    // </div>
  );
}

export default Navigation;
