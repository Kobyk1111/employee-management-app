import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";

function LeaveDetails() {
  const {
    state: { allEmployeesLeaveRequests, loggedInAdmin },
    dispatch,
  } = useContext(DataContext);
  const [leaveResponseInputs, setLeaveResponseInputs] = useState({});

  const { id } = useParams();

  const foundLeave = allEmployeesLeaveRequests.find((leave) => leave._id === id);

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
  }, [allEmployeesLeaveRequests]);

  function handleChange(e) {
    setLeaveResponseInputs({ ...leaveResponseInputs, [e.target.name]: e.target.value });
  }

  async function handleSubmitLeaveResponse(e) {
    e.preventDefault();
    try {
      const leaveResponse = {
        status: leaveResponseInputs.status,
        adminComment: leaveResponseInputs.adminComment,
        adminActionOn: new Date().toDateString(),
      };

      const settings = {
        body: JSON.stringify(leaveResponse),
        headers: {
          "Content-Type": "application/JSON",
        },
        method: "PATCH",
      };

      const response = await fetch(`http://localhost:4001/leave/${foundLeave._id}/updateLeave`, settings);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }

    setLeaveResponseInputs({});
  }

  return (
    <div>
      <p>
        Full Name: {foundLeave.employee.firstname} {foundLeave.employee.lastname}
      </p>
      <p>Email: {foundLeave.employee.email}</p>
      <p>Leave Type: {foundLeave.leaveType}</p>
      <p>
        Applied on: {foundLeave.createdAt.slice(0, 10)} at {foundLeave.createdAt.slice(11, 16)}
      </p>
      <p>Leave Start Date: {foundLeave.startDate.slice(0, 10)}</p>
      <p>Leave End Date: {foundLeave.endDate.slice(0, 10)}</p>
      <p>Leave Comment: {foundLeave.comment}</p>
      <p>Leave Status: {foundLeave.status}</p>
      <p>Admin Comment: {foundLeave.adminComment}</p>
      <button>Set Action</button>
      <form onSubmit={handleSubmitLeaveResponse}>
        <select name="status" value={leaveResponseInputs.status || ""} onChange={handleChange} required>
          <option disabled value="">
            Choose action
          </option>
          <option value="Approved">Approve</option>
          <option value="Rejected">Reject</option>
        </select>
        <textarea
          name="adminComment"
          placeholder="Send a comment..."
          value={leaveResponseInputs.adminComment || ""}
          onChange={handleChange}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default LeaveDetails;
