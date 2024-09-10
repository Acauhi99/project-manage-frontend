import * as yup from "yup";

export const editProjectSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  descricao: yup.string().required("Descrição é obrigatória"),
  data_inicio: yup.date().required("Data de Início é obrigatória"),
  data_fim: yup.date().required("Data de Fim é obrigatória"),
  status: yup
    .string()
    .oneOf(["Em andamento", "Concluído", "Pendente"], "Status inválido")
    .required("Status é obrigatório"),
});
