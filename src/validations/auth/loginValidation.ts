import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});
