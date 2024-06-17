import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./Employees.css";

function Employees() {
  const {
    state: { loggedInAdmin },
  } = useContext(DataContext);
  const navigate = useNavigate();
  const [entry, setEntry] = useState(5);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="employees-page">
      <h2>Employees</h2>

      <button className="add-employee-button" onClick={() => navigate("/admin/employees/addEmployee")}>
        Add Employee
      </button>

      <div className="forms">
        <form className="show-entries-form">
          <p>Show</p>
          <select name="" value={entry} onChange={(e) => setEntry(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          <p>entries</p>
        </form>
        {/* <form className="search-form"> */}
        <input
          type="search"
          name="search"
          value={searchInput}
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {/* <button>Search</button> */}
        {/* </form> */}
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loggedInAdmin.employees
            ?.filter((employee) =>
              searchInput.toLowerCase() === ""
                ? employee
                : employee.firstname.toLowerCase().includes(searchInput) ||
                  employee.lastname.toLowerCase().includes(searchInput) ||
                  employee.email.toLowerCase().includes(searchInput) ||
                  employee.department.toLowerCase().includes(searchInput) ||
                  employee.jobTitle.toLowerCase().includes(searchInput)
            )
            .map((employee, index) => {
              return (
                <tr key={employee._id}>
                  <td>{index + 1}</td>
                  <td>{employee.firstname}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>{employee.jobTitle}</td>
                  <td>
                    <NavLink to={`/admin/employees/${employee._id}`}>View Details</NavLink>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
