import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import LogOrRegisterAdmin from "./pages/LogOrRegisterAdmin/LogOrRegisterAdmin";
import LoginEmployee from "./pages/LoginEmployee/LoginEmployee";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard";
import { DataContext } from "./context/DataContext";
import { useContext, useEffect, useState } from "react";
import Layout from "./components/AdminLayout/Layout";
import Departments from "./pages/Departments/Departments";
import Employees from "./pages/Employees/Employees";
import Leave from "./pages/Leave/Leave";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import EmployeeLayout from "./components/EmployeeLayout/EmployeeLayout";
import EmployeeLeave from "./pages/EmployeeLeave/EmployeeLeave";
import EmployeeLeaveForm from "./components/EmployeeLeaveForm/EmployeeLeaveForm";
import LeaveDetails from "./components/LeaveDetails/LeaveDetails";
import AdminProfileLayout from "./components/AdminProfileLayout/AdminProfileLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AdminPasswordSettings from "./components/AdminPasswordSettings/AdminPasswordSettings";
import AdminAccountSettings from "./components/AdminAccountSettings/AdminAccountSettings";
import EmployeeProfileLayout from "./components/EmployeeProfileLayout/EmployeeProfileLayout";
import EmployeeAccountSettings from "./components/EmployeeAccountSettings/EmployeeAccountSettings";
import EmployeePasswordSettings from "./components/EmployeePasswordSettings/EmployeePasswordSettings";
import { BounceLoader } from "react-spinners";

function App() {
  const {
    state: { loggedInAdmin, loggedInEmployee },
    handleHTTPRequestWithToken,
    dispatch,
  } = useContext(DataContext);
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Store the current path in local storage whenever it changes
    localStorage.setItem("lastPath", location.pathname);
  }, [location]);

  useEffect(() => {
    async function checkAuth(url, loginActionType, lastPathKey, redirectPath) {
      try {
        const response = await handleHTTPRequestWithToken(url, { credentials: "include" });

        if (response.ok) {
          const data = await response.json();
          dispatch({ type: loginActionType, payload: data });
          const lastPath = localStorage.getItem(lastPathKey);
          navigate(lastPath || redirectPath, { replace: true });
        } else {
          localStorage.removeItem(lastPathKey);
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        console.error("Error checking auth:", error.message);
        alert(error.message);
        localStorage.removeItem(lastPathKey);
        navigate(redirectPath, { replace: true });
      } finally {
        setTimeout(() => {
          setInitialLoading(false);
        }, 1000);
      }
    }

    // Only check authentication if not already logged in and if the app is still loading
    const currentPath = location.pathname;

    if (currentPath.startsWith("/admin") && !loggedInAdmin && initialLoading) {
      checkAuth(`${import.meta.env.VITE_API}/admin/check-auth`, "SET_ADMIN_LOGIN", "lastPath", "/adminLogOrRegister");
    } else if (currentPath.startsWith("/employee") && !loggedInEmployee && initialLoading) {
      checkAuth(`${import.meta.env.VITE_API}/employee/check-auth`, "SET_EMPLOYEE_LOGIN", "lastPath", "/employeeLogin");
    } else {
      // Finish loading state if already logged in or path doesn't require authentication
      if (initialLoading) {
        setTimeout(() => {
          setInitialLoading(false);
        }, 1000);
      }
    }
  }, [
    loggedInAdmin,
    loggedInEmployee,
    initialLoading,
    handleHTTPRequestWithToken,
    navigate,
    dispatch,
    location.pathname,
  ]);

  if (initialLoading) {
    return (
      <div className="loading-spinner">
        <BounceLoader color={"#5f71ad"} loading={initialLoading} size={40} />
      </div>
    );
  }

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
            <Route path="profile/account" element={<AdminProfileLayout />}>
              <Route index element={<AdminAccountSettings />} />
              <Route path="password" element={<AdminPasswordSettings />} />
            </Route>
          </Route>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/" />} />
        )}

        {loggedInEmployee ? (
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="leave" element={<EmployeeLeave />} />
            <Route path="leave/addLeave" element={<EmployeeLeaveForm />} />
            <Route path="profile/account" element={<EmployeeProfileLayout />}>
              <Route index element={<EmployeeAccountSettings />} />
              <Route path="password" element={<EmployeePasswordSettings />} />
            </Route>
          </Route>
        ) : (
          <Route path="/employee/*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
