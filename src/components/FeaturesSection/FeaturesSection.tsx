import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const FeaturesSection: React.FC = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <HomeIcon fontSize="large" />
            <Typography variant="h6">Gerenciamento de Projetos</Typography>
            <Typography variant="body1">
              Crie, edite, visualize e remova projetos facilmente.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <InfoIcon fontSize="large" />
            <Typography variant="h6">Gerenciamento de Usuários</Typography>
            <Typography variant="body1">
              Adicione, edite e remova usuários vinculados aos projetos.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <ContactMailIcon fontSize="large" />
            <Typography variant="h6">Suporte</Typography>
            <Typography variant="body1">
              Entre em contato com nossa equipe de suporte para qualquer dúvida.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturesSection;
