import React from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = React.useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history("/login");
    } catch (error) {
      setError("Erro ao sair");
    }
  }

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Atualizar Perfil
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
