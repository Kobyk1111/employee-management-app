import { Outlet, useNavigate } from "react-router-dom";
import EmployeeNavigation from "../EmployeeNavigation/EmployeeNavigation";
import "./EmployeeLayout.css";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import jsCookie from "js-cookie";

function EmployeeLayout() {
  const {
    state: { loggedInEmployee },
    dispatch,
  } = useContext(DataContext);

  const navigate = useNavigate();

  function handleLogout() {
    jsCookie.remove("employeeAccessCookie");
    jsCookie.remove("employeeRefreshCookie");
    dispatch({ type: "SET_EMPLOYEE_LOGIN", payload: "" });
    navigate("/");
  }

  return (
    <div className="employee-layout-container">
      <EmployeeNavigation />
      <div className="employee-outlet">
        <div className="employee-subnav">
          <h3> {loggedInEmployee.companyName}</h3>
          <button onClick={handleLogout}>Log Out</button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeLayout;
