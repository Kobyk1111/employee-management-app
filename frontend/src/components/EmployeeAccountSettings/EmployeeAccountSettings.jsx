import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./EmployeeAccountSettings.css";

function EmployeeAccountSettings() {
  const {
    state: { employeeAccountSettingsInputs, loggedInEmployee },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);
  const [profilePicture, setProfilePicture] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    dispatch({ type: "SET_EMPLOYEE_ACCOUNT_SETTINGS_INPUTS", payload: { [e.target.name]: e.target.value } });
  }

  function handleCancel() {
    dispatch({ type: "SET_EMPLOYEE_ACCOUNT_SETTINGS_INPUTS", payload: "" });
    navigate("/employee/dashboard");
  }

  function handleBankInputs(e) {
    dispatch({ type: "SET_EMPLOYEE_ACCOUNT_SETTINGS_BANK_INPUTS", payload: { [e.target.name]: e.target.value } });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", employeeAccountSettingsInputs.firstname);
    formData.append("lastname", employeeAccountSettingsInputs.lastname);
    formData.append("email", employeeAccountSettingsInputs.email);
    formData.append("gender", employeeAccountSettingsInputs.gender);
    formData.append("maritalStatus", employeeAccountSettingsInputs.maritalStatus);
    formData.append("noOfChildren", employeeAccountSettingsInputs.noOfChildren);
    formData.append("phoneNumber", employeeAccountSettingsInputs.phoneNumber);
    formData.append("city", employeeAccountSettingsInputs.city);
    formData.append("state", employeeAccountSettingsInputs.state);
    formData.append("country", employeeAccountSettingsInputs.country);
    formData.append("street", employeeAccountSettingsInputs.street);
    formData.append("houseNumber", employeeAccountSettingsInputs.houseNumber);
    formData.append("postalCode", employeeAccountSettingsInputs.postalCode);
    formData.append("bankAccountDetails[bankName]", employeeAccountSettingsInputs.bankAccountDetails.bankName);
    formData.append("bankAccountDetails[IBAN]", employeeAccountSettingsInputs.bankAccountDetails.IBAN);
    formData.append("bankAccountDetails[BIC]", employeeAccountSettingsInputs.bankAccountDetails.BIC);
    formData.append("taxIdentificationNumber", employeeAccountSettingsInputs.taxIdentificationNumber);
    formData.append("socialSecurityNumber", employeeAccountSettingsInputs.socialSecurityNumber);
    formData.append("incomeTaxClass", employeeAccountSettingsInputs.incomeTaxClass);
    formData.append("healthInsuranceCompany", employeeAccountSettingsInputs.healthInsuranceCompany);
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
        `${import.meta.env.VITE_API}/employee/updateProfile/${loggedInEmployee.id}`,
        settings
      );

      if (response.ok) {
        const updatedEmployee = await response.json();
        dispatch({ type: "SET_EMPLOYEE_LOGIN", payload: updatedEmployee });
        dispatch({ type: "SET_EMPLOYEE_ACCOUNT_SETTINGS_INPUTS", payload: "" });
        navigate("/employee/dashboard");
        alert(updatedEmployee.message);
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
    <div className="employee-account-settings-page">
      <form onSubmit={handleSubmit}>
        <label>
          Update Profile Picture
          <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
          {/* Image preview code below. The profilePicture state should be truthy before the code will run. */}
          <img src={profilePicture && URL.createObjectURL(profilePicture)} width={100} alt="" />
        </label>
        <label>
          First Name
          <input
            type="text"
            name="firstname"
            value={employeeAccountSettingsInputs.firstname || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastname"
            value={employeeAccountSettingsInputs.lastname || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={employeeAccountSettingsInputs.email || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Gender
          <select name="gender" value={employeeAccountSettingsInputs.gender || ""} onChange={handleChange} required>
            <option disabled value="">
              Choose Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer Not To Say</option>
          </select>
        </label>
        <label>
          Marital Status
          <select
            name="maritalStatus"
            value={employeeAccountSettingsInputs.maritalStatus || ""}
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Choose Marital Status
            </option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </label>
        <label>
          No of Children
          <input
            type="number"
            name="noOfChildren"
            value={employeeAccountSettingsInputs.noOfChildren || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={employeeAccountSettingsInputs.phoneNumber || ""}
            required
            onChange={handleChange}
            placeholder="eg. +4917270294111"
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            value={employeeAccountSettingsInputs.city || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          State
          <input
            type="text"
            name="state"
            value={employeeAccountSettingsInputs.state || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            value={employeeAccountSettingsInputs.country || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Street
          <input
            type="text"
            name="street"
            value={employeeAccountSettingsInputs.street || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          House Number
          <input
            type="number"
            name="houseNumber"
            value={employeeAccountSettingsInputs.houseNumber || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Postal Code
          <input
            type="text"
            name="postalCode"
            value={employeeAccountSettingsInputs.postalCode || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Tax Identification Number
          <input
            type="text"
            name="taxIdentificationNumber"
            value={employeeAccountSettingsInputs.taxIdentificationNumber || ""}
            required
            placeholder="eg. 12345678901"
            onChange={handleChange}
          />
        </label>
        <label>
          Social Security Number
          <input
            type="text"
            name="socialSecurityNumber"
            value={employeeAccountSettingsInputs.socialSecurityNumber || ""}
            required
            placeholder="eg. 12 123456 M 123"
            onChange={handleChange}
          />
        </label>
        <label>
          Income Tax Class
          <input
            type="number"
            name="incomeTaxClass"
            value={employeeAccountSettingsInputs.incomeTaxClass || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Health Insurance Company
          <input
            type="text"
            name="healthInsuranceCompany"
            value={employeeAccountSettingsInputs.healthInsuranceCompany || ""}
            required
            onChange={handleChange}
          />
        </label>
        <h3>Bank Account Details</h3>
        <label>
          Bank Name
          <input
            type="text"
            name="bankName"
            value={employeeAccountSettingsInputs.bankAccountDetails?.bankName || ""}
            required
            onChange={handleBankInputs}
          />
        </label>
        <label>
          IBAN
          <input
            type="text"
            name="IBAN"
            value={employeeAccountSettingsInputs.bankAccountDetails?.IBAN || ""}
            required
            onChange={handleBankInputs}
          />
        </label>
        <label>
          BIC
          <input
            type="text"
            name="BIC"
            value={employeeAccountSettingsInputs.bankAccountDetails?.BIC || ""}
            required
            onChange={handleBankInputs}
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

export default EmployeeAccountSettings;
