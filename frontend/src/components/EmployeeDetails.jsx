import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";

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
    <div>
      <h2>Personal Details</h2>
      <p>First Name: {foundEmployee.firstname}</p>
      <p>Last Name: {foundEmployee.lastname}</p>
      <p>Email: {foundEmployee.email}</p>
      <p>Gender: {foundEmployee.gender}</p>
      <p>Marital Status: {foundEmployee.maritalStatus}</p>
      <p>Number of Children: {foundEmployee.noOfChildren}</p>
      <p>Phone Number: {foundEmployee.phoneNumber}</p>
      <p>Date of Birth: {foundEmployee.dateOfBirth}</p>
      <p>Country: {foundEmployee.country}</p>
      <p>State: {foundEmployee.state}</p>
      <p>City: {foundEmployee.city}</p>
      <p>Postal Code: {foundEmployee.postalCode}</p>
      <p>Street: {foundEmployee.street}</p>
      <p>House Number: {foundEmployee.houseNumber}</p>

      <h2>Work Details</h2>
      <p>Job Title: {foundEmployee.jobTitle}</p>
      <p>Department: {foundEmployee.department}</p>
      <p>Employee ID: {foundEmployee.employeeID}</p>
      <p>Employment Type: {foundEmployee.employmentType}</p>
      <p>Employment Status: {foundEmployee.employmentStatus}</p>
      <p>Date of Joining: {foundEmployee.dateOfJoining}</p>
      <p>Salary: {foundEmployee.salary} per year</p>

      <h2>Bank Details</h2>
      <p>Bank Name: {foundEmployee.bankAccountDetails.bankName}</p>
      <p>IBAN: {foundEmployee.bankAccountDetails.IBAN}</p>
      <p>BIC: {foundEmployee.bankAccountDetails.BIC}</p>

      <h2>Other Details</h2>
      <p>Tax Identification Number: {foundEmployee.taxIdentificationNumber}</p>
      <p>Social Security Number: {foundEmployee.socialSecurityNumber}</p>
      <p>Income Tax Class: {foundEmployee.incomeTaxClass}</p>
      <p>Health Insurance Company: {foundEmployee.healthInsuranceCompany}</p>
      <button onClick={handleEditEmployee}>Edit Employee</button>
      {/* <button>Delete Employee</button> */}
      <button onClick={() => navigate("/admin/employees")}>Go back</button>
    </div>
  );
}

export default EmployeeDetails;
