import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./AddEmployee.css";

function AddEmployee() {
  const {
    state: { loggedInAdmin, createEmployeeInputs, updateEmployeeId },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkDepartmentLength() {
      if (loggedInAdmin.departments.length === 0) {
        alert("Please create department(s) first before creating an employee");
        navigate("/admin/employees");
      }
    }
    checkDepartmentLength();
  }, [loggedInAdmin]);

  function handleChange(e) {
    dispatch({ type: "SET_CREATE_EMPLOYEE_INPUTS", payload: { [e.target.name]: e.target.value } });
  }

  function handleBankInputs(e) {
    dispatch({ type: "SET_BANK_INPUTS", payload: { [e.target.name]: e.target.value } });
  }

  async function handleSubmitEmployee(e) {
    e.preventDefault();

    try {
      const newEmployee = {
        firstname: createEmployeeInputs.firstname,
        lastname: createEmployeeInputs.lastname,
        email: createEmployeeInputs.email,
        password: updateEmployeeId ? createEmployeeInputs.password : "abcd1234A!",
        gender: createEmployeeInputs.gender,
        maritalStatus: createEmployeeInputs.maritalStatus,
        employeeID: updateEmployeeId ? createEmployeeInputs.employeeID : uuidv4(),
        companyId: loggedInAdmin.companyId,
        companyName: loggedInAdmin.companyName,
        jobTitle: createEmployeeInputs.jobTitle,
        employmentType: createEmployeeInputs.employmentType,
        employmentStatus: createEmployeeInputs.employmentStatus,
        noOfChildren: createEmployeeInputs.noOfChildren,
        phoneNumber: createEmployeeInputs.phoneNumber,
        dateOfBirth: createEmployeeInputs.dateOfBirth,
        dateOfJoining: createEmployeeInputs.dateOfJoining,
        city: createEmployeeInputs.city,
        state: createEmployeeInputs.state,
        country: createEmployeeInputs.country,
        street: createEmployeeInputs.street,
        houseNumber: createEmployeeInputs.houseNumber,
        postalCode: createEmployeeInputs.postalCode,
        department: createEmployeeInputs.department,
        salary: createEmployeeInputs.salary,
        bankAccountDetails: {
          bankName: createEmployeeInputs.bankAccountDetails.bankName,
          IBAN: createEmployeeInputs.bankAccountDetails.IBAN,
          BIC: createEmployeeInputs.bankAccountDetails.BIC,
        },
        taxIdentificationNumber: createEmployeeInputs.taxIdentificationNumber,
        socialSecurityNumber: createEmployeeInputs.socialSecurityNumber,
        incomeTaxClass: createEmployeeInputs.incomeTaxClass,
        healthInsuranceCompany: createEmployeeInputs.healthInsuranceCompany,
      };

      const settings = {
        body: JSON.stringify(newEmployee),
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        credentials: "include",
      };

      // If updateEmployeeId is a truthy value, then it means the function will be updating an employee instead of creating a new one
      const response = updateEmployeeId
        ? await handleHTTPRequestWithToken(`${import.meta.env.VITE_API}/employee/${updateEmployeeId}`, settings)
        : await handleHTTPRequestWithToken(`${import.meta.env.VITE_API}/employee`, settings);

      if (response.ok) {
        const { id } = await response.json();

        const settings2 = {
          body: JSON.stringify({ newEmployeeId: id }),
          method: "PATCH",
          headers: {
            "Content-Type": "application/JSON",
          },
          credentials: "include",
        };

        const response2 = await handleHTTPRequestWithToken(
          `${import.meta.env.VITE_API}/admin/addEmployee/${loggedInAdmin.id}/`,
          settings2
        );

        if (response2.ok) {
          const updatedAdmin = await response2.json();

          dispatch({ type: "SET_ADMIN_LOGIN", payload: updatedAdmin });
          dispatch({ type: "SET_EMPLOYEE_ID", payload: "" });
          navigate("/admin/employees");
          alert(updateEmployeeId ? "Employee has been updated successfully" : "Employee has been created successfully");
        } else {
          const { error } = await response2.json();
          throw new Error(error.message);
        }
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
    <div className="add-employee-page">
      {/* <h2>{updateEmployeeId ? "Update Employee" : "Create Employee"}</h2> */}
      <form onSubmit={handleSubmitEmployee}>
        <label>
          First Name
          <input
            type="text"
            name="firstname"
            value={createEmployeeInputs.firstname || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastname"
            value={createEmployeeInputs.lastname || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input type="email" name="email" value={createEmployeeInputs.email || ""} required onChange={handleChange} />
        </label>
        <label>
          Gender
          <select name="gender" value={createEmployeeInputs.gender || ""} onChange={handleChange} required>
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
            value={createEmployeeInputs.maritalStatus || ""}
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
          Job Title
          <input
            type="text"
            name="jobTitle"
            value={createEmployeeInputs.jobTitle || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Employment Type
          <select
            name="employmentType"
            value={createEmployeeInputs.employmentType || ""}
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Choose Employment Type
            </option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </label>
        <label>
          Employment Status
          <select
            name="employmentStatus"
            value={createEmployeeInputs.employmentStatus || ""}
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Choose Employment Status
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Terminated">Terminated</option>
          </select>
        </label>
        <label>
          No of Children
          <input
            type="number"
            name="noOfChildren"
            value={createEmployeeInputs.noOfChildren || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={createEmployeeInputs.phoneNumber || ""}
            required
            onChange={handleChange}
            placeholder="eg. +4917270294111"
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            name="dateOfBirth"
            value={createEmployeeInputs.dateOfBirth || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Joining
          <input
            type="date"
            name="dateOfJoining"
            value={createEmployeeInputs.dateOfJoining || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          City
          <input type="text" name="city" value={createEmployeeInputs.city || ""} required onChange={handleChange} />
        </label>
        <label>
          State
          <input type="text" name="state" value={createEmployeeInputs.state || ""} required onChange={handleChange} />
        </label>
        <label>
          Country
          <input
            type="text"
            name="country"
            value={createEmployeeInputs.country || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Street
          <input type="text" name="street" value={createEmployeeInputs.street || ""} required onChange={handleChange} />
        </label>
        <label>
          House Number
          <input
            type="number"
            name="houseNumber"
            value={createEmployeeInputs.houseNumber || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Postal Code
          <input
            type="text"
            name="postalCode"
            value={createEmployeeInputs.postalCode || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Department
          <select name="department" value={createEmployeeInputs.department || ""} onChange={handleChange} required>
            <option disabled value="">
              Choose Department
            </option>
            {loggedInAdmin?.departments?.map((department) => {
              return (
                <option key={department._id} value={department.name}>
                  {department.name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Salary
          <input
            type="number"
            name="salary"
            value={createEmployeeInputs.salary || ""}
            required
            onChange={handleChange}
          />
        </label>

        <label>
          Tax Identification Number
          <input
            type="text"
            name="taxIdentificationNumber"
            value={createEmployeeInputs.taxIdentificationNumber || ""}
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
            value={createEmployeeInputs.socialSecurityNumber || ""}
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
            value={createEmployeeInputs.incomeTaxClass || ""}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Health Insurance Company
          <input
            type="text"
            name="healthInsuranceCompany"
            value={createEmployeeInputs.healthInsuranceCompany || ""}
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
            value={createEmployeeInputs.bankAccountDetails?.bankName || ""}
            required
            onChange={handleBankInputs}
          />
        </label>
        <label>
          IBAN
          <input
            type="text"
            name="IBAN"
            value={createEmployeeInputs.bankAccountDetails?.IBAN || ""}
            required
            onChange={handleBankInputs}
          />
        </label>
        <label>
          BIC
          <input
            type="text"
            name="BIC"
            value={createEmployeeInputs.bankAccountDetails?.BIC || ""}
            required
            onChange={handleBankInputs}
          />
        </label>
        <button>{updateEmployeeId ? "Update Employee" : "Create Employee"} </button>
      </form>
    </div>
  );
}

export default AddEmployee;
