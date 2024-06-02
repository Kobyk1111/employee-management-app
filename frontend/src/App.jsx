import { Route, Routes } from "react-router-dom";
import LogOrRegisterAdmin from "./pages/LogOrRegisterAdmin";
import Dashboard from "./pages/Dashboard";
import Departments from "./pages/Departments";
import Employees from "./pages/Employees";
import Leave from "./pages/Leave";
import { DataContext } from "./context/DataContext";
import { useContext } from "react";
import Layout from "./components/Layout";
import AddEmployee from "./components/AddEmployee";
import EmployeeDetails from "./components/EmployeeDetails";

function App() {
  const {
    state: { loggedInAdmin },
  } = useContext(DataContext);
  return (
    <>
      {!loggedInAdmin ? (
        <LogOrRegisterAdmin />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/addEmployee" element={<AddEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/leave" element={<Leave />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
