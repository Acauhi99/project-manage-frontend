import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import ErrorMessage from "../../components/Errors/ErrorMessage";

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <LoginForm onError={setErrorMessage} />
        <ErrorMessage
          message={errorMessage}
          sx={{ fontSize: "1.1rem", marginTop: 1 }}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="body2" align="center" sx={{ fontSize: "1.1rem" }}>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
