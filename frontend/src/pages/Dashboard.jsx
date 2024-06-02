import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../context/DataContext";

function Dashboard() {
  const {
    state: { loggedInAdmin },
  } = useContext(DataContext);

  const totalSalary = loggedInAdmin.employees.reduce((acc, curr) => {
    return acc + +curr.salary;
  }, 0);
  return (
    <div>
      <div>
        <h2>{loggedInAdmin.departments.length}</h2>
        <h3>Departments</h3>
        <NavLink>Read more</NavLink>
      </div>
      <div>
        <h2>{loggedInAdmin.employees.length}</h2>
        <h3>Employees</h3>
        <NavLink>Read more</NavLink>
      </div>
      <div>
        <h2>0</h2>
        <h3>Leave Requests</h3>
        <NavLink>Read more</NavLink>
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
