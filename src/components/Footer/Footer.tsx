import { Box, Typography } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ py: 2, textAlign: "center", mt: 4, backgroundColor: "#f5f5f5" }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Sistema de Gerenciamento de Projetos.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Made by Mateus Acauhi
      </Typography>
    </Box>
  );
};

export default Footer;
