import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Layout.css";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Layout() {
  const {
    state: { loggedInAdmin },
    dispatch,
  } = useContext(DataContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function checkAuth() {
  //     try {
  //       const response = await fetch("http://localhost:4001/admin/check-auth", {
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const adminData = await response.json();
  //         dispatch({ type: "SET_ADMIN_LOGIN", payload: adminData });
  //         // navigate("/dashboard");
  //       } else {
  //         navigate("/adminLogOrRegister");
  //         const { error } = await response.json();
  //         throw new Error(error.message);
  //       }
  //     } catch (error) {
  //       console.error("Error checking auth:", error.message);
  //       navigate("/adminLogOrRegister");
  //     }
  //   }

  //   checkAuth();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // If the cookies are set with HTTPOnly, it cannot be removed by javascript from the frontend.
  // So a request has to be sent to the backend to remove the cookies
  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:4001/logout/admin", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch({ type: "SET_ADMIN_LOGIN", payload: "" });
        navigate("/");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div className="admin-layout-container">
      <Navigation />
      <div className="admin-outlet">
        <div className="admin-subnav">
          <h3> {loggedInAdmin.companyName}</h3>
          <button onClick={handleLogout}>Log Out</button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
