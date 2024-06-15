import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./Dashboard.css";

function Dashboard() {
  const {
    state: { loggedInAdmin, allEmployeesLeaveRequests },
    dispatch,
  } = useContext(DataContext);

  const totalSalary = loggedInAdmin.employees.reduce((acc, curr) => {
    return acc + +curr.salary;
  }, 0);

  async function getAllEmployeesLeaveRequests() {
    try {
      const response = await fetch(`http://localhost:4001/leave/${loggedInAdmin.companyId}/getAllLeaves`);

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_ALL_EMPLOYEES_LEAVE_REQUESTS", payload: data });
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getAllEmployeesLeaveRequests();
  }, []);

  return (
    <div>
      <div className="dashboard-data">
        <div className="info-container">
          <h2>{loggedInAdmin.departments.length}</h2>
          <h3>Departments</h3>
          <NavLink to="/admin/departments">Read more</NavLink>
        </div>
        <div className="info-container">
          <h2>{loggedInAdmin.employees.length}</h2>
          <h3>Employees</h3>
          <NavLink to="/admin/employees">Read more</NavLink>
        </div>
        <div className="info-container">
          <h2>{allEmployeesLeaveRequests.length}</h2>
          <h3>Leave Requests</h3>
          <NavLink to="/admin/leave">Read more</NavLink>
        </div>
        <div className="info-container">
          <h2>${totalSalary}</h2>
          <h3>Salary Paid</h3>
          <NavLink>Read more</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
