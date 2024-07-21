import { useContext, useState } from "react";
import "./AdminAccountSettings.css";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

function AdminAccountSettings() {
  const {
    state: { adminAccountSettingsInputs, loggedInAdmin },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);
  const [profilePicture, setProfilePicture] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    dispatch({ type: "SET_ADMIN_ACCOUNT_SETTINGS_INPUTS", payload: { [e.target.name]: e.target.value } });
  }

  function handleCancel() {
    dispatch({ type: "SET_ADMIN_ACCOUNT_SETTINGS_INPUTS", payload: "" });
    navigate("/admin/dashboard");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", adminAccountSettingsInputs.firstname);
    formData.append("lastname", adminAccountSettingsInputs.lastname);
    formData.append("email", adminAccountSettingsInputs.email);
    formData.append("companyName", adminAccountSettingsInputs.companyName);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    const settings = {
      body: formData,
      method: "POST",
      credentials: "include",
    };

    try {
      const response = await handleHTTPRequestWithToken(
        `${import.meta.env.VITE_API}/admin/updateProfile/${loggedInAdmin.id}`,
        settings
      );

      if (response.ok) {
        const updatedAdmin = await response.json();
        dispatch({ type: "SET_ADMIN_LOGIN", payload: updatedAdmin });
        dispatch({ type: "SET_ADMIN_ACCOUNT_SETTINGS_INPUTS", payload: "" });
        navigate("/admin/dashboard");
        alert(updatedAdmin.message);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  async function handleDeleteAccount() {
    if (
      confirm(
        "Are you sure you want to delete your account? Please note that since you are the admin, your data and that of your employees will be deleted if you want to delete your account!"
      )
    ) {
      const settings = {
        method: "DELETE",
        credentials: "include",
      };

      try {
        const response = await handleHTTPRequestWithToken(
          `${import.meta.env.VITE_API}/admin/deleteAccount/${loggedInAdmin.id}`,
          settings
        );

        if (response.ok) {
          const { message } = await response.json();
          alert(message);
          navigate("/adminLogOrRegister");
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="admin-account-settings-page">
      {/* <h3>Account Settings</h3> */}

      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            name="firstname"
            value={adminAccountSettingsInputs.firstname || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastname"
            value={adminAccountSettingsInputs.lastname || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input type="email" name="email" value={adminAccountSettingsInputs.email || ""} onChange={handleChange} />
        </label>
        <label>
          Company Name
          <input
            type="text"
            name="companyName"
            value={adminAccountSettingsInputs.companyName || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Update Profile Picture
          <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
          {/* Image preview code below. The profilePicture state should be truthy before the code will run. */}
          <img src={profilePicture && URL.createObjectURL(profilePicture)} width={100} alt="" />
        </label>
        <div className="buttons-container">
          <button type="submit">Update</button>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleDeleteAccount} className="delete-account-button">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAccountSettings;
