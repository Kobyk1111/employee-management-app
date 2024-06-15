import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import "./Layout.css";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Layout() {
  const { dispatch } = useContext(DataContext);
  const navigate = useNavigate();

  function handleLogout() {
    dispatch({ type: "SET_ADMIN_LOGIN", payload: "" });
    navigate("/");
  }
  return (
    <div className="admin-layout-container">
      <Navigation />
      <div className="admin-outlet">
        <div className="admin-subnav">
          SubNav
          <button onClick={handleLogout}>Log Out</button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
