import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Project, ProjectUser } from "../../services/project/dto";
import ProjectAccordion from "./ProjectAccordion";
import ProjectRow from "./ProjectRow";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  onSelect: (projectId: number) => void;
  handleFetchProjectUsers: (projectId: number) => void;
  selectedProjectUsers: ProjectUser[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onEdit,
  onDelete,
  onSelect,
  handleFetchProjectUsers,
  selectedProjectUsers,
}) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (projectId: number, isExpanded: boolean) => {
    setExpanded(isExpanded ? projectId : false);
  };

  return (
    <Box>
      {projects.map((project) => (
        <Box key={project.id} mb={2} component={Paper} p={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Data de Início</TableCell>
                  <TableCell>Data de Fim</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <ProjectRow
                  project={project}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onSelect={onSelect}
                />
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <ProjectAccordion
                      projectId={project.id}
                      expanded={expanded === project.id}
                      handleChange={handleChange}
                      selectedProjectUsers={selectedProjectUsers}
                      onExpand={handleFetchProjectUsers}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

export default ProjectTable;
