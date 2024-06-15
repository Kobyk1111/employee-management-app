import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome To HRHub</h1>
      <h2>Simplify Your Employee Management Process</h2>
      <p>HRHub is designed to help businesses streamline their HR operations.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Centralized Employee Database: Keep all employee information in one secure place.</li>
        <li>Leave Management: Track and approve leave requests with ease.</li>
        <li>User-Friendly Interface: Our intuitive design ensures ease of use for all users.</li>
      </ul>
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
