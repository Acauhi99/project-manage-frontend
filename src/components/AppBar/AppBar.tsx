import {
  Button,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sistema de Gerenciamento de Projetos
        </Typography>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
