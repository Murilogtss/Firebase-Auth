import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = React.useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Foi uma mensagem para seu e-mail!");
    } catch (error) {
      setError("Erro ao efetuar resete de sennha.");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Resetar Senha</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button type="submit" className="w-100 mt-4" disabled={loading}>
              Resetar Senha
            </Button>
          </Form>
          <div className="w-100 text-center mt3">
            <Link to="/login">Efetuar Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Ainda não tem uma conta? <Link to="/signup">Cadastrar</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
