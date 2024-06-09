import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { NavLink } from "react-router-dom";

function Leave() {
  const {
    state: { allEmployeesLeaveRequests },
    dispatch,
  } = useContext(DataContext);

  async function getAllEmployeesLeaveRequests() {
    try {
      const response = await fetch(`http://localhost:4001/leave`);

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_ALL_EMPLOYEES_LEAVE_REQUESTS", payload: data });
        console.log(data);
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
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Leave Type</th>
            <th>Applied On</th>
            <th>Current Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allEmployeesLeaveRequests.map((leave, index) => {
            return (
              <tr key={leave._id}>
                <td>{index + 1}</td>
                <td>
                  {leave.employee.firstname} {leave.employee.lastname}
                </td>
                <td>{leave.employee.email}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.createdAt.slice(0, 10)}</td>
                <td>{leave.status}</td>
                <td>
                  <NavLink to={`/admin/leave/${leave._id}`}>View Details</NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leave;
