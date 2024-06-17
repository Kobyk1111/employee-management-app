import { Route, Routes, Navigate /* useNavigate */ } from "react-router-dom";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import LogOrRegisterAdmin from "./pages/LogOrRegisterAdmin/LogOrRegisterAdmin";
import LoginEmployee from "./pages/LoginEmployee/LoginEmployee";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard";
import { DataContext } from "./context/DataContext";
import { useContext /* useEffect */ } from "react";
import Layout from "./components/AdminLayout/Layout";
import Departments from "./pages/Departments/Departments";
import Employees from "./pages/Employees/Employees";
import Leave from "./pages/Leave/Leave";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeLayout from "./components/EmployeeLayout/EmployeeLayout";
import EmployeeLeave from "./pages/EmployeeLeave/EmployeeLeave";
import EmployeeLeaveForm from "./components/EmployeeLeaveForm/EmployeeLeaveForm";
import LeaveDetails from "./components/LeaveDetails/LeaveDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  const {
    state: { loggedInAdmin, loggedInEmployee },
    // dispatch,
  } = useContext(DataContext);

  // const navigate = useNavigate();

  // The useEffect will keep the admin logged in so far as the admin is authenticated, even when the app is refreshed.
  // useEffect(() => {
  //   async function checkAuth() {
  //     try {
  //       const response = await fetch("http://localhost:4001/admin/check-auth", {
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const adminData = await response.json();
  //         dispatch({ type: "SET_ADMIN_LOGIN", payload: adminData });
  //         navigate("/admin/dashboard");
  //       } else {
  //         navigate("/adminLogOrRegister");
  //         const { error } = await response.json();
  //         throw new Error(error.message);
  //       }
  //     } catch (error) {
  //       console.error("Error checking auth:", error.message);
  //       alert(error.message);
  //       navigate("/adminLogOrRegister");
  //     }
  //   }

  //   checkAuth();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminLogOrRegister" element={<LogOrRegisterAdmin />} />
        <Route path="/employeeLogin" element={<LoginEmployee />} />

        {loggedInAdmin ? (
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="departments" element={<Departments />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/addEmployee" element={<AddEmployee />} />
            <Route path="employees/:id" element={<EmployeeDetails />} />
            <Route path="leave" element={<Leave />} />
            <Route path="leave/:id" element={<LeaveDetails />} />
          </Route>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/" />} />
        )}

        {loggedInEmployee ? (
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="leave" element={<EmployeeLeave />} />
            <Route path="leave/addLeave" element={<EmployeeLeaveForm />} />
          </Route>
        ) : (
          <Route path="/employee/*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* )} */}
    </>
  );
}

export default App;
