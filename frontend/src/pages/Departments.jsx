import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import EachDepartment from "../components/EachDepartment";

function Departments() {
  const [newDepartment, setNewDepartment] = useState("");
  const [entry, setEntry] = useState(1);
  const [updateDepartmentId, setUpdateDepartmentId] = useState("");
  const {
    state: { loggedInAdmin },
    dispatch,
  } = useContext(DataContext);

  async function handleSubmitDepartment(e) {
    e.preventDefault();

    try {
      const settings = {
        body: JSON.stringify({ newDepartment }),
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      // If updateDepartmentId is a truthy value, then it means the function will be updating a department instead of creating a new one
      const response = updateDepartmentId
        ? await fetch(`http://localhost:4001/department/${updateDepartmentId}`, settings)
        : await fetch("http://localhost:4001/department", settings);

      if (response.ok) {
        const { id } = await response.json();

        const settings2 = {
          body: JSON.stringify({ newDepartmentId: id }),
          method: "PATCH",
          headers: {
            "Content-Type": "application/JSON",
          },
        };

        const response2 = await fetch(`http://localhost:4001/admin/${loggedInAdmin.id}/addDepartment`, settings2);

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

  return (
    <div>
      <h2>Departments</h2>

      <form onSubmit={handleSubmitDepartment}>
        <input
          type="text"
          name="department"
          placeholder="Add department here"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          required
        />
        <button>{updateDepartmentId ? "Update Department" : "Add Department"} </button>
      </form>

      <form>
        <p>Show</p>
        <select name="" value={entry} onChange={(e) => setEntry(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p>entries</p>
      </form>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
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
  );
}

export default Departments;
