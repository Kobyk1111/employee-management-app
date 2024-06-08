import { useNavigate } from "react-router-dom";

function EmployeeLeave() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/employee/leave/addLeave")}>Request Leave</button>
    </div>
  );
}

export default EmployeeLeave;
