import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function LoginEmployee() {
  const {
    state: { logEmployeeInputs, error },
    dispatch,
  } = useContext(DataContext);

  const navigate = useNavigate();

  function handleChange(e) {
    dispatch({ type: "EMPLOYEE_INPUTS_CHANGE", payload: { [e.target.name]: e.target.value } });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const employeeLoginInputs = {
      email: logEmployeeInputs.email,
      password: logEmployeeInputs.password,
    };

    const settings = {
      body: JSON.stringify(employeeLoginInputs),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };

    try {
      const response = await fetch("http://localhost:4001/employee/login", settings);

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_EMPLOYEE_LOGIN", payload: data });
        dispatch({ type: "SET_ERROR", payload: "" });
        navigate("/employee/dashboard");
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" value={logEmployeeInputs.email || ""} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={logEmployeeInputs.password || ""}
            onChange={handleChange}
            required
          />
        </label>
        <button>Submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginEmployee;
