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
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/departments">Departments</NavLink>
          </li>
          <li>
            <NavLink to="/employees">Employees</NavLink>
          </li>
          <li>
            <NavLink to="/leave">Leave</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
