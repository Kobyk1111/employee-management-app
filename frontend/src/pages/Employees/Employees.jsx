import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "./Employees.css";
import noDataImg from "../../assets/49586629_9264402 1.png";

function Employees() {
  const {
    state: { loggedInAdmin, allEmployees },
    handleHTTPRequestWithToken,
    dispatch,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const [entry, setEntry] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [currPage, setCurrPage] = useState(1);

  const url = `${import.meta.env.VITE_API}/employee/getAllEmployees/${
    loggedInAdmin.companyId
  }?page=${currPage}&entry=${entry}&search=${searchInput}`;

  async function getAllEmployees() {
    try {
      const response = await handleHTTPRequestWithToken(url, { credentials: "include" });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_ALL_EMPLOYEES", payload: data });
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getAllEmployees();
  }, [currPage, entry, searchInput]);

  return (
    <div className="employees-page">
      <button className="add-employee-button" onClick={() => navigate("/admin/employees/addEmployee")}>
        Create Employee
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
        <label>
          current page: {currPage}{" "}
          <input
            type="button"
            value="Previous page"
            onClick={() => setCurrPage(currPage > 1 ? currPage - 1 : currPage)}
            disabled={currPage === 1}
          />
          <input
            type="button"
            value="Next page"
            onClick={() => setCurrPage(allEmployees.length > currPage ? currPage + 1 : currPage)}
            disabled={allEmployees.length < currPage}
          />
        </label>
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

      {allEmployees.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Avatar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Job Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allEmployees.map((employee) => {
                return (
                  <tr key={employee._id}>
                    {/* <td>{index + 1}</td> */}
                    <td className="image-data">
                      <img src={employee.profilePicture} alt="" width={35} />
                    </td>
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
      ) : (
        <div className="no-data-container">
          <img src={noDataImg} alt="" width={350} />
          <h3 className="no-data">No data to show</h3>
        </div>
      )}
    </div>
  );
}

export default Employees;
