import { Container } from "react-bootstrap";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
