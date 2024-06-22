import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Layout.css";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import DropDownProfile from "../DropDownProfile/DropDownProfile";

function Layout() {
  const {
    state: { loggedInAdmin },
    // dispatch,
  } = useContext(DataContext);
  const [openProfile, setOpenProfile] = useState(false);
  // const navigate = useNavigate();

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

  // async function handleLogout() {
  //   try {
  //     const response = await fetch("http://localhost:4001/logout/admin", {
  //       method: "POST",
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       dispatch({ type: "SET_ADMIN_LOGIN", payload: "" });
  //       navigate("/");
  //     } else {
  //       console.error("Failed to log out");
  //     }
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // }

  return (
    <div className="admin-layout-container">
      <Navigation />
      <div className="admin-outlet">
        <div className="admin-subnav">
          <h3> {loggedInAdmin.companyName}</h3>
          <div className="user-profile" onClick={() => setOpenProfile((prev) => !prev)}>
            <h3>{loggedInAdmin.username}</h3>
            <img src={loggedInAdmin.profilePicture} alt="profilePic" width={40} height={40} />
          </div>
          {openProfile && <DropDownProfile setOpenProfile={setOpenProfile} />}

          {/* <button onClick={handleLogout}>Log Out</button> */}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
