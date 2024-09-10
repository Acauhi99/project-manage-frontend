import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { Project } from "../../services/project/dto";

interface ProjectRowProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  onSelect: (projectId: number) => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  project,
  onEdit,
  onDelete,
  onSelect,
}) => {
  return (
    <TableRow
      onClick={() => onSelect(project.id)}
      style={{ cursor: "pointer" }}
    >
      <TableCell>{project.nome}</TableCell>
      <TableCell>{project.descricao}</TableCell>
      <TableCell>{project.data_inicio}</TableCell>
      <TableCell>{project.data_fim || "N/A"}</TableCell>
      <TableCell>{project.status}</TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(project);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
