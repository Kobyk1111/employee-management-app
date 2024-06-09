import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {
  const { dispatch } = useContext(DataContext);

  const navigate = useNavigate();

  function handleLogout() {
    dispatch({ type: "SET_EMPLOYEE_LOGIN", payload: "" });
    navigate("/");
  }
  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default EmployeeDashboard;
