import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./Dashboard.css";

function Dashboard() {
  const {
    state: { loggedInAdmin, allEmployeesLeaveRequests },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);

  const navigate = useNavigate();

  const totalSalary = loggedInAdmin.employees.reduce((acc, curr) => {
    return acc + +curr.salary;
  }, 0);

  const pendingLeaves = allEmployeesLeaveRequests.filter((leave) => leave.status === "Pending");

  async function getAllEmployeesLeaveRequests() {
    try {
      const response = await handleHTTPRequestWithToken(
        `http://localhost:4001/leave/getAllLeaves/${loggedInAdmin.companyId}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_ALL_EMPLOYEES_LEAVE_REQUESTS", payload: data });
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
      if (error.message === "Authentication required. Please log in.") {
        navigate("/adminLogOrRegister");
      }
    }
  }

  useEffect(() => {
    getAllEmployeesLeaveRequests();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2 className="welcome">Welcome, {loggedInAdmin.firstname}</h2>
      <div className="dashboard-data">
        <div className="info-container one">
          <h2>{loggedInAdmin.departments.length}</h2>
          <h4>Departments</h4>
          <NavLink to="/admin/departments">View Details</NavLink>
        </div>
        <div className="info-container two">
          <h2>{loggedInAdmin.employees.length}</h2>
          <h4>Employees</h4>
          <NavLink to="/admin/employees">View Details</NavLink>
        </div>
        <div className="info-container three">
          <h2>{pendingLeaves.length}</h2>
          <h4>Pending Leave Requests</h4>
          <NavLink to="/admin/leave">View Details</NavLink>
        </div>
        <div className="info-container four">
          <h2>${totalSalary}</h2>
          <h4>Salary Per Year</h4>
          {/* <NavLink>Read more</NavLink> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
