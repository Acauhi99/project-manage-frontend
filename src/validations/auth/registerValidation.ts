import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  papel: yup
    .string()
    .oneOf(["Gerente", "Desenvolvedor", "Designer"], "Papel inválido")
    .required("Papel é obrigatório"),
});
