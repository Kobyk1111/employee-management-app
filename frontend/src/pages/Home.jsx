import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome! Please choose your login type:</h1>
      <Link to="/adminLogOrRegister">
        <button>Login as Admin</button>
      </Link>
      <Link to="/employeeLogin">
        <button>Login as Employee</button>
      </Link>
    </div>
  );
}

export default Home;
