import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Documents from "./pages/documents";
import AuthContext from "./context/auth-context";
import { useContext } from "react";
import Login from "./pages/login";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <Router>
      <div>
        <Routes>
          {!ctx.isLoggedIn ? (
            <Route path="/" element={<Login />} />
          ) : (
            <Route path="/" element={<Documents />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
