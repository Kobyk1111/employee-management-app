import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/9652797_4232852.png";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <nav>
        <h2>AdminHub</h2>
        <button onClick={() => navigate("/adminLogOrRegister")}>Get Started</button>
      </nav>
      <main>
        <div className="hero-content">
          <div className="hero-main-container">
            <h2>Simplify Your Employee Management Process</h2>
            <p>AdminHub is designed to help businesses streamline their administrative operations.</p>
          </div>
          <div className="features-container">
            <h3>Key Features</h3>
            <ul>
              <li>Centralized Employee Database: Keep all employee information in one secure place.</li>
              <li>Leave Management: Track and approve leave requests with ease.</li>
              <li>User-Friendly Interface: Our intuitive design ensures ease of use for all users.</li>
            </ul>
          </div>
          <button onClick={() => navigate("/adminLogOrRegister")}>Get Started</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="" />
        </div>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} | Designed and developed by Worlanyo Kwabla Kporfeame</p>
      </footer>
    </div>
  );
}

export default LandingPage;
