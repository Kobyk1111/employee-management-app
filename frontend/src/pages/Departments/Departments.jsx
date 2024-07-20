import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import EachDepartment from "../../components/EachDepartment/EachDepartment";
import noDataImg from "../../assets/49586629_9264402 1.png";
import "./Departments.css";

function Departments() {
  const [newDepartment, setNewDepartment] = useState("");
  const [entry, setEntry] = useState(1);
  const [updateDepartmentId, setUpdateDepartmentId] = useState("");
  const {
    state: { loggedInAdmin },
    dispatch,
    handleHTTPRequestWithToken,
  } = useContext(DataContext);

  console.log(loggedInAdmin);

  async function handleSubmitDepartment(e) {
    e.preventDefault();

    try {
      const settings = {
        body: JSON.stringify({ newDepartment, companyId: loggedInAdmin.companyId }),
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        credentials: "include",
      };

      // If updateDepartmentId is a truthy value, then it means the function will be updating a department instead of creating a new one
      const response = updateDepartmentId
        ? await handleHTTPRequestWithToken(`${import.meta.env.VITE_API}/department/${updateDepartmentId}`, settings)
        : await handleHTTPRequestWithToken(`${import.meta.env.VITE_API}/department`, settings);

      if (response.ok) {
        const { id } = await response.json();

        const settings2 = {
          body: JSON.stringify({ newDepartmentId: id }),
          method: "PATCH",
          headers: {
            "Content-Type": "application/JSON",
          },
          credentials: "include",
        };

        const response2 = await handleHTTPRequestWithToken(
          `${import.meta.env.VITE_API}/admin/addDepartment/${loggedInAdmin.id}`,
          settings2
        );

        if (response2.ok) {
          const updatedAdmin = await response2.json();
          dispatch({ type: "SET_ADMIN_LOGIN", payload: updatedAdmin });
          setNewDepartment("");
          setUpdateDepartmentId("");
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

  console.log(loggedInAdmin.departments);

  return (
    <div className="departments-page">
      <h2>Departments</h2>

      <form className="add-department-form" onSubmit={handleSubmitDepartment}>
        <input
          type="text"
          name="department"
          placeholder="Add department here..."
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          required
        />
        <button>{updateDepartmentId ? "Update Department" : "Create Department"} </button>
      </form>

      <form className="show-entries-form">
        <p>Show</p>
        <select name="" value={entry} onChange={(e) => setEntry(e.target.value)}>
          <option value="5">5</option>
          <option value="8">8</option>
        </select>
        <p>entries</p>
      </form>

      {loggedInAdmin.departments.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Number of employees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loggedInAdmin.departments?.map((department, index) => {
                return (
                  <EachDepartment
                    key={department._id}
                    index={index}
                    department={department}
                    setNewDepartment={setNewDepartment}
                    setUpdateDepartmentId={setUpdateDepartmentId}
                  />
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

export default Departments;
