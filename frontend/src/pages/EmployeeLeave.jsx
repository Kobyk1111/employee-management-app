/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

function EmployeeLeave() {
  const {
    state: { employeeLeaveRequests, loggedInEmployee },
    dispatch,
  } = useContext(DataContext);
  const navigate = useNavigate();

  async function getAllLeaveRequests(id) {
    try {
      const response = await fetch(`http://localhost:4001/leave/${id}`);

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
    <div>
      <button onClick={() => navigate("/employee/leave/addLeave")}>Request Leave</button>

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
                <td>{leave.status}</td>
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
    </div>
  );
}

export default EmployeeLeave;
