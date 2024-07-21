/* eslint-disable react/prop-types */
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./DropDownProfile.css";

function DropDownProfile({ setOpenProfile }) {
  const {
    state: { loggedInAdmin },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);
  const navigate = useNavigate();

  // If the cookies are set with HTTPOnly, it cannot be removed by javascript from the frontend.
  // So a request has to be sent to the backend to remove the cookies
  async function handleLogout() {
    try {
      const response = await handleHTTPRequestWithToken(`${import.meta.env.VITE_API}/logout/admin`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch({ type: "SET_ADMIN_LOGIN", payload: "" });
        navigate("/adminLogOrRegister");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  function handleProfile() {
    dispatch({ type: "SET_ADMIN_ACCOUNT_SETTINGS_INPUTS", payload: loggedInAdmin });
    navigate("/admin/profile/account");
    setOpenProfile(false);
  }

  return (
    <div className="admin-drop-down-container">
      <ul>
        <li onClick={handleProfile}>Profile</li>
        {/* <li>Settings</li> */}
        <li className="logout" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default DropDownProfile;
