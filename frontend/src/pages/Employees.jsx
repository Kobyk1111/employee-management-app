import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

function Employees() {
  const {
    state: { loggedInAdmin },
  } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/admin/employees/addEmployee")}>Add Employee</button>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loggedInAdmin.employees?.map((employee, index) => {
            return (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
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
