import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import "./LeaveDetails.css";

function LeaveDetails() {
  const {
    state: { allEmployeesLeaveRequests, loggedInAdmin },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);
  const [leaveResponseInputs, setLeaveResponseInputs] = useState({});
  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();

  const foundLeave = allEmployeesLeaveRequests.find((leave) => leave._id === id);

  async function getAllEmployeesLeaveRequests() {
    try {
      const response = await handleHTTPRequestWithToken(
        `http://localhost:4001/leave/${loggedInAdmin.companyId}/getAllLeaves`,
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
        credentials: "include",
      };

      const response = await handleHTTPRequestWithToken(
        `http://localhost:4001/leave/${foundLeave._id}/updateLeave`,
        settings
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setShowForm(false);
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
    <div className="leave-details-page">
      <h2>Leave Details</h2>
      <div>
        <p>
          <span>Full Name:</span>
        </p>
        <p>
          {foundLeave.employee.firstname} {foundLeave.employee.lastname}
        </p>
      </div>
      <div>
        <p>
          <span>Email: </span>
        </p>
        <p>{foundLeave.employee.email}</p>
      </div>
      <div>
        <p>
          <span>Leave Type:</span>
        </p>
        <p> {foundLeave.leaveType}</p>
      </div>
      <div>
        <p>
          <span>Applied on:</span>
        </p>
        <p>
          {foundLeave.createdAt.slice(0, 10)} at {foundLeave.createdAt.slice(11, 16)}
        </p>
      </div>
      <div>
        <p>
          <span>Leave Start Date: </span>
        </p>
        <p>{foundLeave.startDate.slice(0, 10)}</p>
      </div>
      <div>
        <p>
          <span>Leave End Date: </span>
        </p>
        <p>{foundLeave.endDate.slice(0, 10)}</p>
      </div>
      <div>
        <p>
          <span>Employee Comment: </span>
        </p>
        <p>{foundLeave.comment}</p>
      </div>
      <div>
        <p>
          <span>Leave Status: </span>
        </p>
        <p
          style={{
            color: foundLeave.status === "Pending" ? "blue" : foundLeave.status === "Rejected" ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {foundLeave.status}
        </p>
      </div>
      <div>
        <p>
          <span>Admin Comment: </span>
        </p>
        <p>{foundLeave.adminComment}</p>
      </div>
      <button className="set-action-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Set Action"}
      </button>
      {showForm && (
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
      )}
    </div>
  );
}

export default LeaveDetails;
