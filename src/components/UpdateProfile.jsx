import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate, Link } from "react-router-dom";

const UpdateProfile = () => {
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  if (!currentUser.email) return <Navigate to={"/login"} />;

  const history = useNavigate();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfirmRef = React.useRef();
  const { signup } = useAuth();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("As senhas não conferem.");
    }

    const promises = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history("/");
      })
      .catch((err) => {
        setError("Falha ao atualizar perfil.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Atualizar Pefil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Deixe em branco para não alterar"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Deixe em branco para não alterar"
              />
            </Form.Group>
            <Button type="submit" className="w-100 mt-4" disabled={loading}>
              Atualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancelar</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
