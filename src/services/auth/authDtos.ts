export interface Response {
  token: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  papel: string;
}

export interface ErrorRegister {
  message: string;
}
