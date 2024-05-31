import { Route, Routes } from "react-router-dom";
import LogOrRegisterAdmin from "./pages/LogOrRegisterAdmin";
import Dashboard from "./pages/Dashboard";
import { DataContext } from "./context/DataContext";
import { useContext } from "react";

function App() {
  const {
    state: { loggedInAdmin },
  } = useContext(DataContext);
  return (
    <>
      {!loggedInAdmin ? (
        <LogOrRegisterAdmin />
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      )}
    </>
  );
}

export default App;
