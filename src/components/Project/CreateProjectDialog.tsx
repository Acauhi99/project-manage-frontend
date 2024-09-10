import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Project } from "../../services/project/dto";
import { createProjectSchema } from "../../validations/project/createValidation";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: Omit<Project, "id" | "data_fim">) => void;
  newProject: Omit<Project, "id" | "data_fim">;
  setNewProject: React.Dispatch<
    React.SetStateAction<Omit<Project, "id" | "data_fim">>
  >;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  open,
  onClose,
  onCreate,
  newProject,
}) => {
  const formik = useFormik({
    initialValues: newProject,
    validationSchema: createProjectSchema,
    onSubmit: (values) => {
      onCreate(values);
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ style: { maxWidth: 600 } }}
    >
      <DialogTitle>Criar Novo Projeto</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Nome"
              fullWidth
              name="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Descrição"
              fullWidth
              name="descricao"
              value={formik.values.descricao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.descricao && Boolean(formik.errors.descricao)
              }
              helperText={formik.touched.descricao && formik.errors.descricao}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Data de Início"
              fullWidth
              type="date"
              name="data_inicio"
              value={formik.values.data_inicio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.data_inicio && Boolean(formik.errors.data_inicio)
              }
              helperText={
                formik.touched.data_inicio && formik.errors.data_inicio
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <Box mb={2}>
            <FormControl
              fullWidth
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Status"
              >
                <MenuItem value="Em andamento">Em andamento</MenuItem>
                <MenuItem value="Concluído">Concluído</MenuItem>
                <MenuItem value="Pendente">Pendente</MenuItem>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <Box color="error.main" mt={1}>
                  {formik.errors.status}
                </Box>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" color="primary">
            Criar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateProjectDialog;
