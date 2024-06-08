/* eslint-disable react/prop-types */
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function EachDepartment({ department, index, setNewDepartment, setUpdateDepartmentId }) {
  const {
    state: { loggedInAdmin },
    dispatch,
  } = useContext(DataContext);

  async function handleDelete(id) {
    if (confirm(`Are you sure you want to delete ${department.name}`)) {
      try {
        const response = await fetch(`http://localhost:4001/department/${id}`, { method: "DELETE" });

        if (response.ok) {
          const { id, message } = await response.json();

          alert(message);

          const response2 = await fetch(`http://localhost:4001/admin/${loggedInAdmin.id}/deleteDepartment/${id}`, {
            method: "DELETE",
          });

          if (response2.ok) {
            const data = await response2.json();
            dispatch({ type: "SET_ADMIN_LOGIN", payload: data });
          } else {
            const { error } = await response2.json();
            throw new Error(error.message);
          }
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }

  async function handleUpdate(id) {
    const foundDepartment = loggedInAdmin.departments.find((department) => department._id === id);

    setNewDepartment(foundDepartment.name);
    setUpdateDepartmentId(foundDepartment._id);
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{department.name}</td>
      <td>
        <button onClick={() => handleUpdate(department._id)}>Edit</button>
        <button onClick={() => handleDelete(department._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default EachDepartment;
