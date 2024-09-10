import { ErrorRegister } from "../../services/auth/authDtos";

export function extractErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data
  ) {
    return (error.response.data as ErrorRegister).message;
  }
  return "Erro interno do servidor.";
}
