import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const {
    state: { employeeLeaveRequests, loggedInEmployee },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);

  const navigate = useNavigate();

  async function getAllLeaveRequests(id) {
    try {
      const response = await handleHTTPRequestWithToken(`${import.meta.env.VITE_API}/leave/${id}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_EMPLOYEE_LEAVE_REQUESTS", payload: data });
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getAllLeaveRequests(loggedInEmployee.id);
  }, []);

  function handleProfile() {
    dispatch({ type: "SET_EMPLOYEE_ACCOUNT_SETTINGS_INPUTS", payload: loggedInEmployee });
    navigate("/employee/profile/account");
  }

  const approvedLeaves = employeeLeaveRequests.filter((leave) => leave.status === "Approved");
  const rejectedLeaves = employeeLeaveRequests.filter((leave) => leave.status === "Rejected");
  const pendingLeaves = employeeLeaveRequests.filter((leave) => leave.status === "Pending");

  return (
    <div className="employee-dashboard">
      <h2 className="welcome">Welcome, {loggedInEmployee.firstname}</h2>
      <div className="dashboard-data">
        <div className="info-container one">
          <h2>{rejectedLeaves.length}</h2>
          <h4>Rejected Leave Requests</h4>
        </div>
        <div className="info-container two">
          <h2>{approvedLeaves.length}</h2>
          <h4>Approved Leave Requests</h4>
        </div>
        <div className="info-container three">
          <h2>{pendingLeaves.length}</h2>
          <h4>Pending Leave Requests</h4>
        </div>
        <div className="info-container four">
          <h4>Profile</h4>
          <p onClick={handleProfile} to={"/employee/profile/account"}>
            Go to profile
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
