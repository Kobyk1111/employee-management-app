import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./AdminPasswordSettings.css";

function AdminPasswordSettings() {
  const {
    state: { loggedInAdmin },
    handleHTTPRequestWithToken,
  } = useContext(DataContext);
  const [passwords, setPasswords] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  function handleCancel() {
    setPasswords({});
    navigate("/admin/dashboard");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newPassword = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    };

    try {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword),
        credentials: "include",
      };

      const response = await handleHTTPRequestWithToken(
        `http://localhost:4001/admin/updatePassword/${loggedInAdmin.id}/`,
        settings
      );

      if (response.ok) {
        const { message } = await response.json();
        alert(message);
        navigate("/admin/dashboard");
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  return (
    <div className="admin-password-settings-page">
      {/* <h3>Password Settings</h3> */}

      <form onSubmit={handleSubmit}>
        <label>
          Old password
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={passwords.oldPassword || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={passwords.newPassword || ""}
            onChange={handleChange}
            required
          />
        </label>
        <div className="buttons-container">
          <button type="submit">Update</button>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminPasswordSettings;
