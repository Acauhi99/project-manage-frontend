import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../../services/auth/authDtos";
import { extractErrorMessage } from "../../services/auth/authErrors";
import { authService } from "../../services/auth/authService";
import { validationSchema } from "../../validations/auth/registerValidation";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  papel: string;
}

interface RegisterFormProps {
  onError: (message: string | null) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onError }) => {
  const navigate = useNavigate();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      papel: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      values: RegisterFormValues,
      { setSubmitting }: FormikHelpers<RegisterFormValues>
    ) => {
      try {
        const data: RegisterData = {
          nome: values.name,
          email: values.email,
          senha: values.password,
          papel: values.papel,
        };
        const { token } = await authService.register(data);
        localStorage.setItem("jwt", token);
        navigate("/dashboard");
      } catch (error: unknown) {
        onError(extractErrorMessage(error));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
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
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="papel-label">Papel</InputLabel>
        <Select
          labelId="papel-label"
          id="papel"
          name="papel"
          value={formik.values.papel}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.papel && Boolean(formik.errors.papel)}
          label="Papel"
        >
          <MenuItem value="Gerente">Gerente</MenuItem>
          <MenuItem value="Desenvolvedor">Desenvolvedor</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        sx={{ marginTop: 2 }}
      >
        Registrar
      </Button>
    </form>
  );
};

export default RegisterForm;
