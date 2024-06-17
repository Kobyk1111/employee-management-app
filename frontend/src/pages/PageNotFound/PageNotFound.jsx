import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <h2>Sorry, there is no page here!!</h2>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

export default PageNotFound;
