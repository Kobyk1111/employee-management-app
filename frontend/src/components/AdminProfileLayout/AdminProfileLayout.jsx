import { NavLink, Outlet } from "react-router-dom";
import "./AdminProfileLayout.css";

function ProfileLayout() {
  return (
    <div className="admin-profile-layout-container">
      <nav className="navigation">
        <ul>
          <li>
            {/* The end attribute stops the link from being active and another link is clicked. This is useful if the first link is has the index route in App.jsx */}
            <NavLink to="/admin/profile/account" end>
              Account Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/profile/account/password">Change Password</NavLink>
          </li>
        </ul>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
