import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./LoginEmployee.css";
// import image from "../../assets/pawel-czerwinski-f0uJwOCef28-unsplash.jpg";

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
      credentials: "include",
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/employee/login`, settings);

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
    <div className="employee-login-page">
      <form onSubmit={handleSubmit}>
        <h2>Employee Login</h2>
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
      <p>
        Go back to Admin Login{" "}
        <span
          onClick={() => {
            navigate("/adminLogOrRegister");
            dispatch({ type: "SET_ERROR", payload: "" });
            dispatch({ type: "SET_EMPLOYEE_LOGIN", payload: "" });
          }}
        >
          Here
        </span>
      </p>
    </div>
  );
}

export default LoginEmployee;
