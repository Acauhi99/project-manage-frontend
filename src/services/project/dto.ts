export interface Project {
  id: number;
  nome: string;
  descricao: string;
  data_inicio: string;
  data_fim?: string;
  status: string;
}

export interface ProjectUser {
  id: number;
  nome: string;
  email: string;
  papel: string;
}
