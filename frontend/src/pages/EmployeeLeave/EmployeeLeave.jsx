/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./EmployeeLeave.css";

function EmployeeLeave() {
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

  return (
    <div className="employee-leave-page">
      <h2>Leave Requests</h2>
      <button onClick={() => navigate("/employee/leave/addLeave")}>Request Leave</button>

      {employeeLeaveRequests.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Admin Action On</th>
              <th>Admin's Remark</th>
            </tr>
          </thead>
          <tbody>
            {employeeLeaveRequests?.map((leave, index) => {
              return (
                <tr key={leave._id}>
                  <td>{index + 1}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate.slice(0, 10)}</td>
                  <td>{leave.endDate.slice(0, 10)}</td>
                  <td>{leave.comment}</td>
                  <td
                    style={{
                      color: leave.status === "Pending" ? "blue" : leave.status === "Rejected" ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {leave.status}
                  </td>
                  <td>
                    {leave.createdAt.slice(0, 10)} at {leave.createdAt.slice(11, 16)}
                  </td>
                  <td>
                    {leave.adminActionOn &&
                      `${leave.adminActionOn?.slice(0, 10)} at ${leave.adminActionOn?.slice(11, 16)}`}
                  </td>
                  <td>{leave.adminComment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4>You have no leave request. Click on request leave button to create new leave request</h4>
      )}
    </div>
  );
}

export default EmployeeLeave;
