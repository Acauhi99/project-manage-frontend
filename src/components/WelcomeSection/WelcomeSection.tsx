import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const WelcomeSection: React.FC = () => {
  return (
    <Container
      sx={{
        flex: 1,
        mt: 4,
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Sistema de Gerenciamento de Projetos
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: "1.2rem" }}>
        O Sistema de Gerenciamento de Projetos (SGP) é uma plataforma intuitiva
        e robusta para a administração de projetos. Através do SGP, você poderá
        criar, editar, visualizar e remover projetos, além de gerenciar usuários
        vinculados a esses projetos, categorizando-os por seus papéis
        específicos.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard"
        >
          Ir aos Projetos
        </Button>
      </Box>
    </Container>
  );
};

export default WelcomeSection;
