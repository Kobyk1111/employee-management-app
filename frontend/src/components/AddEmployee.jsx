import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function AddEmployee() {
  const {
    state: { loggedInAdmin, createEmployeeInputs },
    dispatch,
  } = useContext(DataContext);

  const navigate = useNavigate();

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
        gender: createEmployeeInputs.gender,
        maritalStatus: createEmployeeInputs.maritalStatus,
        employeeID: uuidv4(),
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
      };

      const response = await fetch("http://localhost:4001/employee", settings);

      if (response.ok) {
        const { id } = await response.json();

        const settings2 = {
          body: JSON.stringify({ newEmployeeId: id }),
          method: "PATCH",
          headers: {
            "Content-Type": "application/JSON",
          },
        };

        const response2 = await fetch(`http://localhost:4001/admin/${loggedInAdmin.id}/addEmployee`, settings2);

        if (response2.ok) {
          const updatedAdmin = await response2.json();

          dispatch({ type: "SET_ADMIN_LOGIN", payload: updatedAdmin });
          navigate("/employees");
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
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitEmployee}>
        <label>
          First Name
          <input type="text" name="firstname" value={createEmployeeInputs.firstname} required onChange={handleChange} />
        </label>
        <label>
          Last Name
          <input type="text" name="lastname" value={createEmployeeInputs.lastname} required onChange={handleChange} />
        </label>
        <label>
          Email
          <input type="email" name="email" value={createEmployeeInputs.email} required onChange={handleChange} />
        </label>
        <label>
          Gender
          <select name="gender" value={createEmployeeInputs.gender} onChange={handleChange} required>
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
          <select name="maritalStatus" value={createEmployeeInputs.maritalStatus} onChange={handleChange} required>
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
          <input type="text" name="jobTitle" value={createEmployeeInputs.jobTitle} required onChange={handleChange} />
        </label>
        <label>
          Employment Type
          <select name="employmentType" value={createEmployeeInputs.employmentType} onChange={handleChange} required>
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
            value={createEmployeeInputs.employmentStatus}
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
            value={createEmployeeInputs.noOfChildren}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number
          <input
            type="number"
            name="phoneNumber"
            value={createEmployeeInputs.phoneNumber}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            name="dateOfBirth"
            value={createEmployeeInputs.dateOfBirth}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Joining
          <input
            type="date"
            name="dateOfJoining"
            value={createEmployeeInputs.dateOfJoining}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          City
          <input type="text" name="city" value={createEmployeeInputs.city} required onChange={handleChange} />
        </label>
        <label>
          State
          <input type="text" name="state" value={createEmployeeInputs.state} required onChange={handleChange} />
        </label>
        <label>
          Country
          <input type="text" name="country" value={createEmployeeInputs.country} required onChange={handleChange} />
        </label>
        <label>
          Street
          <input type="text" name="street" value={createEmployeeInputs.street} required onChange={handleChange} />
        </label>
        <label>
          House Number
          <input
            type="number"
            name="houseNumber"
            value={createEmployeeInputs.houseNumber}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Postal Code
          <input
            type="number"
            name="postalCode"
            value={createEmployeeInputs.postalCode}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Department
          <select name="department" value={createEmployeeInputs.department} onChange={handleChange} required>
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
          <input type="text" name="salary" value={createEmployeeInputs.salary} required onChange={handleChange} />
        </label>
        <h3>Bank Account Details</h3>
        <label>
          Bank Name
          <input
            type="text"
            name="bankName"
            value={createEmployeeInputs.bankAccountDetails.bankName}
            required
            onChange={handleBankInputs}
          />
        </label>
        <label>
          IBAN
          <input
            type="text"
            name="IBAN"
            value={createEmployeeInputs.bankAccountDetails.IBAN}
            required
            onChange={handleBankInputs}
          />
        </label>
        <label>
          BIC
          <input
            type="text"
            name="BIC"
            value={createEmployeeInputs.bankAccountDetails.BIC}
            required
            onChange={handleBankInputs}
          />
        </label>
        <label>
          Tax Identification Number
          <input
            type="number"
            name="taxIdentificationNumber"
            value={createEmployeeInputs.taxIdentificationNumber}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Social Security Number
          <input
            type="text"
            name="socialSecurityNumber"
            value={createEmployeeInputs.socialSecurityNumber}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Income Tax Class
          <input
            type="number"
            name="incomeTaxClass"
            value={createEmployeeInputs.incomeTaxClass}
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Health Insurance Company
          <input
            type="text"
            name="healthInsuranceCompany"
            value={createEmployeeInputs.healthInsuranceCompany}
            required
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddEmployee;
