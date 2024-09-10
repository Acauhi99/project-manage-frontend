import axios from "axios";
import { Project, ProjectUser } from "./dto";
import {
  ProjectError,
  ProjectHasUsersError,
  ProjectNameExistsError,
  ProjectNotCompletedError,
  ProjectNotFoundError,
} from "./error";

const API_URL = "http://localhost:8081/api/projetos";

interface AxiosError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

const handleError = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        throw new ProjectNotFoundError();
      case 409:
        throw new ProjectNameExistsError();
      case 403:
        if (
          error.response.data.message ===
          "Não é possível remover projetos não concluídos."
        ) {
          throw new ProjectNotCompletedError();
        } else if (
          error.response.data.message ===
          "Remova todos os usuários antes de deletar o projeto."
        ) {
          throw new ProjectHasUsersError();
        }
        break;
      default:
        throw new ProjectError("Erro desconhecido.");
    }
  } else {
    throw new ProjectError("Erro de conexão.");
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<{ projects: { projects: Project[] } }>(
      API_URL
    );
    return response.data.projects.projects;
  } catch (error) {
    handleError(error as AxiosError);
    return [];
  }
};

export const createProject = async (
  project: Omit<Project, "id" | "data_fim">
): Promise<Project | null> => {
  try {
    const response = await axios.post<Project>(API_URL, project);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    return null;
  }
};

export const editProject = async (
  id: number,
  project: Project
): Promise<Project | null> => {
  try {
    const response = await axios.put<Project>(`${API_URL}/${id}`, project);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    return null;
  }
};

export const deleteProject = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const fetchProjectUsers = async (
  projectId: number
): Promise<ProjectUser[]> => {
  try {
    const response = await axios.get<{ users: ProjectUser[] }>(
      `${API_URL}/${projectId}/usuarios`
    );
    return response.data.users;
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      return [];
    }
    handleError(error as AxiosError);
    return [];
  }
};

export const addUserToProject = async (
  projectId: number,
  userId: number
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/${projectId}/usuarios`, {
      usuario_id: userId,
    });
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const removeUserFromProject = async (
  projectId: number,
  userId: number
): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${projectId}/usuarios/${userId}`);
  } catch (error) {
    handleError(error as AxiosError);
  }
};
