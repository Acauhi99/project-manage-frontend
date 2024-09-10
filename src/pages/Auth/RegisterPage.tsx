import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/Auth/RegisterForm";
import ErrorMessage from "../../components/Errors/ErrorMessage";

const RegisterPage: React.FC = () => {
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
          Cadastro
        </Typography>
        <RegisterForm onError={setErrorMessage} />
        <ErrorMessage
          message={errorMessage}
          sx={{ fontSize: "1.2rem", marginTop: 2 }}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="body2" align="center" sx={{ fontSize: "1.1rem" }}>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
