import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const { signup, login } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch (error) {
      setError("Erro ao efetuar Login.");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Efetuar Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button type="submit" className="w-100 mt-4" disabled={loading}>
              Entrar
            </Button>
          </Form>
          <div className="w-100 text-center mt3">
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Ainda não tem uma conta? <Link to="/signup">Cadastrar</Link>
      </div>
    </>
  );
};

export default Login;
