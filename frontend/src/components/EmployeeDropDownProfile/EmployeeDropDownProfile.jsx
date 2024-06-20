/* eslint-disable react/prop-types */
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./EmployeeDropDownProfile.css";

function DropDownProfile({ setOpenProfile }) {
  const {
    state: { loggedInEmployee },
    dispatch,
  } = useContext(DataContext);
  const navigate = useNavigate();

  // If the cookies are set with HTTPOnly, it cannot be removed by javascript from the frontend.
  // So a request has to be sent to the backend to remove the cookies
  async function handleLogout() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/logout/employee`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch({ type: "SET_EMPLOYEE_LOGIN", payload: "" });
        navigate("/employeeLogin");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  function handleProfile() {
    dispatch({ type: "SET_EMPLOYEE_ACCOUNT_SETTINGS_INPUTS", payload: loggedInEmployee });
    navigate("/employee/profile/account");
    setOpenProfile(false);
  }
  return (
    <div className="drop-down-container">
      <ul>
        <li onClick={handleProfile}>Profile</li>
        <li className="logout" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default DropDownProfile;
