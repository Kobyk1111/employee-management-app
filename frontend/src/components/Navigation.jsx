import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <nav>
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
    </div>
  );
}

export default Navigation;
