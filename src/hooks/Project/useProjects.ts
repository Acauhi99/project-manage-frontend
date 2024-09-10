import { useEffect, useState } from "react";
import { Project, ProjectUser } from "../../services/project/dto";
import {
  createProject,
  deleteProject,
  editProject,
  fetchProjects,
  fetchProjectUsers,
} from "../../services/project/service";

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectUsers, setSelectedProjectUsers] = useState<
    ProjectUser[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const projects = await fetchProjects();
      setProjects(projects);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const handleCreateProject = async (
    project: Omit<Project, "id" | "data_fim">
  ) => {
    const newProject = await createProject(project);
    if (newProject) {
      setProjects([...projects, newProject]);
    }
  };

  const handleEditProject = async (id: number, project: Project) => {
    const updatedProject = await editProject(id, project);
    if (updatedProject) {
      setProjects(projects.map((p) => (p.id === id ? updatedProject : p)));
    }
  };

  const handleDeleteProject = async (id: number) => {
    await deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleFetchProjectUsers = async (projectId: number) => {
    const users = await fetchProjectUsers(projectId);
    setSelectedProjectUsers(users);
  };

  return {
    projects,
    loading,
    error,
    selectedProjectUsers,
    handleCreateProject,
    handleEditProject,
    handleDeleteProject,
    handleFetchProjectUsers,
    setError,
  };
};

export default useProjects;
