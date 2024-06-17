import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="buttons-container">
        <Link to="/adminLogOrRegister">
          <button>Login as Admin</button>
        </Link>
        <Link to="/employeeLogin">
          <button>Login as Employee</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
