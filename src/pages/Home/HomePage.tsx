import { Box, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import Footer from "../../components/Footer/Footer";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
        },
        "#root": {
          height: "100%",
        },
      },
    },
  },
});

const HomePage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <AppBar />
        <WelcomeSection />
        <FeaturesSection />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
