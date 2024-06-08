import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function LeaveForm() {
  const {
    state: { leaveInputs },
    dispatch,
  } = useContext(DataContext);

  function handleChange(e) {
    dispatch({ type: "LEAVE_INPUTS_CHANGE", payload: { [e.target.name]: e.target.value } });
  }

  return (
    <div>
      <form>
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
        <button>Submit</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}

export default LeaveForm;
