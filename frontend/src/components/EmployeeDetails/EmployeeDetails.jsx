import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./EmployeeDetails.css";

function EmployeeDetails() {
  const {
    state: { loggedInAdmin },
    dispatch,
  } = useContext(DataContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const foundEmployee = loggedInAdmin.employees.find((employee) => employee._id === id);

  async function handleEditEmployee() {
    // Since we already have the id in the foundEmployee variable above, we can use it in this function without looking for the employee again.
    dispatch({ type: "SET_CREATE_EMPLOYEE_INPUTS", payload: foundEmployee });
    dispatch({ type: "SET_EMPLOYEE_ID", payload: foundEmployee._id });
    navigate("/admin/employees/addEmployee");
  }

  return (
    <div className="employee-details-page">
      <div className="top">
        {/* <h2>Employee Details</h2> */}
        <div className="buttons-container">
          <button onClick={handleEditEmployee} className="edit-button">
            Edit Employee
          </button>
          {/* <button>Delete Employee</button> */}
          <button className="go-back-button" onClick={() => navigate("/admin/employees")}>
            Go back
          </button>
        </div>
      </div>
      <div className="details-container">
        <h2>Personal Details</h2>
        <div>
          <p>
            <span>First Name:</span>
          </p>
          <p>{foundEmployee?.firstname}</p>
        </div>
        <div>
          <p>
            <span>Last Name:</span>
          </p>
          <p>{foundEmployee.lastname}</p>
        </div>
        <div>
          <p>
            <span>Email:</span>
          </p>
          <p>{foundEmployee.email}</p>
        </div>
        <div>
          <p>
            <span>Gender:</span>
          </p>
          <p>{foundEmployee.gender}</p>
        </div>
        <div>
          <p>
            <span>Marital Status:</span>
          </p>
          <p>{foundEmployee.maritalStatus}</p>
        </div>
        <div>
          <p>
            <span>Number of Children:</span>
          </p>
          <p>{foundEmployee.noOfChildren}</p>
        </div>
        <div>
          <p>
            <span>Phone Number:</span>
          </p>
          <p>{foundEmployee.phoneNumber}</p>
        </div>
        <div>
          <p>
            <span>Date of Birth:</span>
          </p>
          <p>{foundEmployee.dateOfBirth}</p>
        </div>
        <div>
          <p>
            <span>Country:</span>
          </p>
          <p>{foundEmployee.country}</p>
        </div>
        <div>
          <p>
            <span>State:</span>
          </p>
          <p>{foundEmployee.state}</p>
        </div>
        <div>
          <p>
            <span>City:</span>
          </p>
          <p>{foundEmployee.city}</p>
        </div>
        <div>
          <p>
            <span>Postal Code:</span>
          </p>
          <p>{foundEmployee.postalCode}</p>
        </div>
        <div>
          <p>
            <span>Street:</span>
          </p>
          <p>{foundEmployee.street}</p>
        </div>
        <div>
          <p>
            <span>House Number:</span>
          </p>
          <p>{foundEmployee.houseNumber}</p>
        </div>
        <h2>Work Details</h2>
        <div>
          <p>
            <span>Job Title: </span>
          </p>
          <p>{foundEmployee.jobTitle}</p>
        </div>
        <div>
          <p>
            <span>Department:</span>
          </p>
          <p>{foundEmployee.department}</p>
        </div>
        <div>
          <p>
            <span>Employee ID:</span>
          </p>
          <p>{foundEmployee.employeeID}</p>
        </div>
        <div>
          <p>
            <span>Employment Type:</span>
          </p>
          <p>{foundEmployee.employmentType}</p>
        </div>
        <div>
          <p>
            <span>Employment Status:</span>
          </p>
          <p>{foundEmployee.employmentStatus}</p>
        </div>
        <div>
          <p>
            <span>Date of Joining:</span>
          </p>
          <p>{foundEmployee.dateOfJoining}</p>
        </div>
        <div>
          <p>
            <span>Salary:</span>
          </p>
          <p>{foundEmployee.salary} per year</p>
        </div>
        <h2>Bank Details</h2>
        <div>
          <p>
            <span>Bank Name:</span>
          </p>
          <p>{foundEmployee.bankAccountDetails.bankName}</p>
        </div>
        <div>
          <p>
            <span>IBAN:</span>
          </p>
          <p>{foundEmployee.bankAccountDetails.IBAN}</p>
        </div>
        <div>
          <p>
            <span>BIC:</span>
          </p>
          <p>{foundEmployee.bankAccountDetails.BIC}</p>
        </div>
        <h2>Other Details</h2>
        <div>
          <p>
            <span>Tax Identification Number:</span>
          </p>
          <p>{foundEmployee.taxIdentificationNumber}</p>
        </div>
        <div>
          <p>
            <span>Social Security Number: </span>
          </p>
          <p>{foundEmployee.socialSecurityNumber}</p>
        </div>
        <div>
          <p>
            <span>Income Tax Class:</span>
          </p>
          <p>{foundEmployee.incomeTaxClass}</p>
        </div>
        <div>
          <p>
            <span>Health Insurance Company:</span>
          </p>
          <p>{foundEmployee.healthInsuranceCompany}</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
