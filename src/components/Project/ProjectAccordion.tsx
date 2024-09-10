import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ProjectUser } from "../../services/project/dto";
import {
  addUserToProject,
  removeUserFromProject,
} from "../../services/project/service";

interface ProjectAccordionProps {
  projectId: number;
  expanded: boolean;
  handleChange: (projectId: number, isExpanded: boolean) => void;
  selectedProjectUsers: ProjectUser[];
  onExpand: (projectId: number) => void;
}

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({
  projectId,
  expanded,
  handleChange,
  selectedProjectUsers,
  onExpand,
}) => {
  const [newUserId, setNewUserId] = useState<number | null>(null);

  const handleAccordionChange = (
    _: React.ChangeEvent<unknown>,
    isExpanded: boolean
  ) => {
    handleChange(projectId, isExpanded);
    if (isExpanded) {
      onExpand(projectId);
    }
  };

  const handleAddUser = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (newUserId !== null) {
      await addUserToProject(projectId, newUserId);
      onExpand(projectId);
      setNewUserId(null);
    }
  };

  const handleRemoveUser = async (userId: number) => {
    await removeUserFromProject(projectId, userId);
    onExpand(projectId);
  };

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${projectId}-content`}
        id={`panel-${projectId}-header`}
      >
        <Typography>Usuários do Projeto</Typography>
        {expanded && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            style={{ marginLeft: "auto" }}
          >
            Adicionar Usuário
          </Button>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Papel</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProjectUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.papel}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProjectAccordion;
