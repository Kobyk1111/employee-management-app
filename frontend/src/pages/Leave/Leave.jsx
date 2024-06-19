import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { NavLink } from "react-router-dom";
import "./Leave.css";

function Leave() {
  const {
    state: { allEmployeesLeaveRequests, loggedInAdmin },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);
  const [entry, setEntry] = useState(5);
  const [searchInput, setSearchInput] = useState("");

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
    }
  }

  useEffect(() => {
    getAllEmployeesLeaveRequests();
  }, []);

  return (
    <div className="leave-page">
      <h2>Leave Requests</h2>
      <div className="forms">
        <form className="show-entries-form">
          <p>Show</p>
          <select name="" value={entry} onChange={(e) => setEntry(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <p>entries</p>
        </form>
        {/* <form className="search-form"> */}
        <input
          type="search"
          name="search"
          value={searchInput}
          id=""
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
        {/* <button>Search</button> */}
        {/* </form> */}
      </div>
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
          {allEmployeesLeaveRequests
            .filter((leave) =>
              searchInput.toLowerCase() === ""
                ? leave
                : leave.employee.firstname.toLowerCase().includes(searchInput) ||
                  leave.employee.lastname.toLowerCase().includes(searchInput) ||
                  leave.employee.email.toLowerCase().includes(searchInput) ||
                  leave.leaveType.toLowerCase().includes(searchInput) ||
                  leave.createdAt.slice(0, 10).includes(searchInput) ||
                  leave.status.toLowerCase().includes(searchInput)
            )
            .map((leave, index) => {
              return (
                <tr key={leave._id}>
                  <td>{index + 1}</td>
                  <td>
                    {leave.employee.firstname} {leave.employee.lastname}
                  </td>
                  <td>{leave.employee.email}</td>
                  <td>{leave.leaveType}</td>
                  <td>
                    {leave.createdAt.slice(0, 10)} at {leave.createdAt.slice(11, 16)}
                  </td>
                  <td
                    style={{
                      color: leave.status === "Pending" ? "blue" : leave.status === "Rejected" ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {leave.status}
                  </td>
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
