import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const {
    state: { loggedInAdmin },
    dispatch,
  } = useContext(DataContext);

  const totalSalary = loggedInAdmin.employees.reduce((acc, curr) => {
    return acc + +curr.salary;
  }, 0);

  const navigate = useNavigate();

  function handleLogout() {
    dispatch({ type: "SET_ADMIN_LOGIN", payload: "" });
    navigate("/adminLogOrRegister");
  }

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
      <div>
        <h2>{loggedInAdmin.departments.length}</h2>
        <h3>Departments</h3>
        <NavLink to="/admin/departments">Read more</NavLink>
      </div>
      <div>
        <h2>{loggedInAdmin.employees.length}</h2>
        <h3>Employees</h3>
        <NavLink to="/admin/employees">Read more</NavLink>
      </div>
      <div>
        <h2>0</h2>
        <h3>Leave Requests</h3>
        <NavLink to="/admin/leave">Read more</NavLink>
      </div>
      <div>
        <h2>${totalSalary}</h2>
        <h3>Salary Paid</h3>
        <NavLink>Read more</NavLink>
      </div>
    </div>
  );
}

export default Dashboard;
