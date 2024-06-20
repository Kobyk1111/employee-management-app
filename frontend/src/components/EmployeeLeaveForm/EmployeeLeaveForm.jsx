import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./EmployeeLeaveForm.css";

function LeaveForm() {
  const {
    state: { leaveInputs, loggedInEmployee },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);

  const navigate = useNavigate();

  function handleChange(e) {
    dispatch({ type: "LEAVE_INPUTS_CHANGE", payload: { [e.target.name]: e.target.value } });
  }

  function handleCancel() {
    navigate("/employee/leave");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newLeaveRequest = {
        employee: loggedInEmployee.id,
        companyId: loggedInEmployee.companyId,
        leaveType: leaveInputs.leaveType,
        startDate: leaveInputs.startDate,
        endDate: leaveInputs.endDate,
        comment: leaveInputs.comment,
        adminActionOn: loggedInEmployee && "",
      };

      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(newLeaveRequest),
        credentials: "include",
      };

      const response = await handleHTTPRequestWithToken(`${import.meta.env.VITE_API}/leave`, settings);

      if (response.ok) {
        const { message } = await response.json();
        alert(message);
        navigate("/employee/leave");
        dispatch({ type: "SET_LEAVE_INPUTS" });
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="employee-leave-form-page">
      {/* <h2>Leave Form</h2> */}
      <form onSubmit={handleSubmit}>
        <label>
          Leave Type
          <select name="leaveType" value={leaveInputs.leaveType || ""} onChange={handleChange} required>
            <option disabled value="">
              Choose Leave Type
            </option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
            <option value="Paid Leave">Paid Leave</option>
            <option value="Educational Leave">Educational Leave</option>
            <option value="Child Sick Leave">Child Sick Leave</option>
          </select>
        </label>

        <div className="dates-container">
          <label>
            Start Date
            <input type="date" name="startDate" value={leaveInputs.startDate || ""} onChange={handleChange} required />
          </label>
          <label>
            End Date
            <input type="date" name="endDate" value={leaveInputs.endDate || ""} onChange={handleChange} required />
          </label>
        </div>
        <label>
          Comment (Optional)
          <textarea name="comment" rows={7} value={leaveInputs.comment || ""} onChange={handleChange} />
        </label>
        <div className="buttons-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeaveForm;
