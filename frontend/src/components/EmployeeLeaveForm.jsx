import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function LeaveForm() {
  const {
    state: { leaveInputs, loggedInEmployee },
    dispatch,
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
      };

      const response = await fetch("http://localhost:4001/leave", settings);

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
    <div>
      <form onSubmit={handleSubmit}>
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
        <label>
          Start Date
          <input type="date" name="startDate" value={leaveInputs.startDate || ""} onChange={handleChange} required />
        </label>
        <label>
          End Date
          <input type="date" name="endDate" value={leaveInputs.endDate || ""} onChange={handleChange} required />
        </label>
        <label>
          Comment (Optional)
          <textarea name="comment" value={leaveInputs.comment || ""} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default LeaveForm;
