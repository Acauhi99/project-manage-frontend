import { Button, TextField } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../../services/auth/authDtos";
import { extractErrorMessage } from "../../services/auth/authErrors";
import { authService } from "../../services/auth/authService";
import { validationSchema } from "../../validations/auth/loginValidation";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onError: (message: string | null) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onError }) => {
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (
      values: LoginFormValues,
      { setSubmitting, validateForm }: FormikHelpers<LoginFormValues>
    ) => {
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        try {
          const data: LoginData = {
            email: values.email,
            senha: values.password,
          };
          const { token } = await authService.login(data);
          localStorage.setItem("jwt", token);
          navigate("/dashboard");
        } catch (error: unknown) {
          onError(extractErrorMessage(error));
        } finally {
          setSubmitting(false);
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        label="Senha"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ marginBottom: 3 }}
      />
      <Button variant="contained" color="primary" fullWidth type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
