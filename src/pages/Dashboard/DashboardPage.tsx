import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CreateProjectDialog from "../../components/Project/CreateProjectDialog";
import EditProjectDialog from "../../components/Project/EditProjectDialog";
import ProjectTable from "../../components/Project/ProjectTable";
import useProjects from "../../hooks/Project/useProjects";
import { Project } from "../../services/project/dto";

const DashboardPage: React.FC = () => {
  const {
    projects,
    loading,
    error,
    selectedProjectUsers,
    handleCreateProject,
    handleEditProject,
    handleDeleteProject,
    handleFetchProjectUsers,
    setError,
  } = useProjects();

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    nome: "",
    descricao: "",
    data_inicio: "",
    status: "Em andamento",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCloseSnackbar = () => {
    if (error) {
      setError(null);
    }
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleCreateProjectWrapper = async (
    project: Omit<Project, "id" | "data_fim">
  ) => {
    try {
      await handleCreateProject(project);
      setSuccessMessage("Projeto criado com sucesso!");
      setOpenCreateDialog(false);
    } catch {
      setError("Erro ao criar projeto");
    }
  };

  const handleEditProjectWrapper = async (project: Project) => {
    if (currentProject) {
      try {
        await handleEditProject(currentProject.id, project);
        setSuccessMessage("Projeto editado com sucesso!");
        setOpenEditDialog(false);
      } catch {
        setError("Erro ao editar projeto");
      }
    }
  };

  const handleDeleteProjectWrapper = async (id: number) => {
    try {
      await handleDeleteProject(id);
      setSuccessMessage("Projeto excluído com sucesso!");
    } catch {
      setError("Erro ao excluir projeto");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Projetos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreateDialog(true)}
      >
        Criar Novo Projeto
      </Button>
      {loading && <CircularProgress />}
      <ProjectTable
        projects={projects}
        onEdit={(project) => {
          setCurrentProject(project);
          setOpenEditDialog(true);
        }}
        onDelete={handleDeleteProjectWrapper}
        onSelect={(projectId) => handleFetchProjectUsers(projectId)}
        handleFetchProjectUsers={handleFetchProjectUsers}
        selectedProjectUsers={selectedProjectUsers}
      />

      <CreateProjectDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onCreate={handleCreateProjectWrapper}
        newProject={newProject}
        setNewProject={setNewProject}
      />

      <EditProjectDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onEdit={handleEditProjectWrapper}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />

      <Snackbar
        open={!!error || !!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%", maxWidth: "600px" }}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DashboardPage;
