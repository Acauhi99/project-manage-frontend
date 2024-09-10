import { SxProps, Typography } from "@mui/material";
import React from "react";

interface ErrorMessageProps {
  message: string | null;
  sx?: SxProps;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, sx }) => {
  if (!message) return null;

  return (
    <Typography
      variant="body1"
      color="error"
      align="center"
      gutterBottom
      sx={sx}
    >
      {message}
    </Typography>
  );
};

export default ErrorMessage;
