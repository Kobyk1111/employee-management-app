// import { Route, Routes } from "react-router-dom";
// import LogOrRegisterAdmin from "./pages/LogOrRegisterAdmin";
// import Dashboard from "./pages/Dashboard";
// import Departments from "./pages/Departments";
// import Employees from "./pages/Employees";
// import Leave from "./pages/Leave";
// import { DataContext } from "./context/DataContext";
// import { useContext } from "react";
// import Layout from "./components/Layout";
// import AddEmployee from "./components/AddEmployee";
// import EmployeeDetails from "./components/EmployeeDetails";

// function App() {
//   const {
//     state: { loggedInAdmin },
//   } = useContext(DataContext);
//   return (
//     <>
//       {!loggedInAdmin ? (
//         <LogOrRegisterAdmin />
//       ) : (
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Dashboard />} />
//             <Route path="/departments" element={<Departments />} />
//             <Route path="/employees" element={<Employees />} />
//             <Route path="/employees/addEmployee" element={<AddEmployee />} />
//             <Route path="/employees/:id" element={<EmployeeDetails />} />
//             <Route path="/leave" element={<Leave />} />
//           </Route>
//         </Routes>
//       )}
//     </>
//   );
// }

// export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogOrRegisterAdmin from "./pages/LogOrRegisterAdmin";
import LoginEmployee from "./pages/LoginEmployee";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import { DataContext } from "./context/DataContext";
import { useContext } from "react";
import Layout from "./components/Layout";
import Departments from "./pages/Departments";
import Employees from "./pages/Employees";
import Leave from "./pages/Leave";
import AddEmployee from "./components/AddEmployee";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeLayout from "./components/EmployeeLayout";
import EmployeeLeave from "./pages/EmployeeLeave";
import EmployeeLeaveForm from "./components/EmployeeLeaveForm";

function App() {
  const {
    state: { loggedInAdmin, loggedInEmployee },
  } = useContext(DataContext);

  console.log(loggedInAdmin);
  console.log(loggedInEmployee);

  return (
    <>
      {/* {!loggedInAdmin && !loggedInEmployee ? (
        <Home /> 
      ) : ( */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminLogOrRegister" element={<LogOrRegisterAdmin />} />
        <Route path="/employeeLogin" element={<LoginEmployee />} />

        {loggedInAdmin && (
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="departments" element={<Departments />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/addEmployee" element={<AddEmployee />} />
            <Route path="employees/:id" element={<EmployeeDetails />} />
            <Route path="leave" element={<Leave />} />
          </Route>
        )}

        {loggedInEmployee && (
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="leave" element={<EmployeeLeave />} />
            <Route path="leave/addLeave" element={<EmployeeLeaveForm />} />
          </Route>
        )}
      </Routes>
      {/* )} */}
    </>
  );
}

export default App;
