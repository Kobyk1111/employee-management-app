import { Outlet } from "react-router-dom";
import EmployeeNavigation from "./EmployeeNavigation";

function EmployeeLayout() {
  return (
    <div>
      <EmployeeNavigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeLayout;
