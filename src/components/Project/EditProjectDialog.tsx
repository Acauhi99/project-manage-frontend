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
import { editProjectSchema } from "../../validations/project/editValidation";

interface EditProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onEdit: (project: Project) => void;
  currentProject: Project | null;
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  open,
  onClose,
  onEdit,
  currentProject,
}) => {
  const formik = useFormik({
    initialValues: {
      nome: currentProject?.nome || "",
      descricao: currentProject?.descricao || "",
      data_inicio: currentProject?.data_inicio || "",
      data_fim: currentProject?.data_fim || "",
      status: currentProject?.status || "",
    },
    validationSchema: editProjectSchema,
    onSubmit: async (values) => {
      await onEdit({ ...values, id: currentProject?.id ?? 0 });
      onClose(); // Fechar o modal após a submissão bem-sucedida
    },
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Projeto</DialogTitle>
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
            <TextField
              label="Data de Fim"
              fullWidth
              type="date"
              name="data_fim"
              value={formik.values.data_fim}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.data_fim && Boolean(formik.errors.data_fim)}
              helperText={formik.touched.data_fim && formik.errors.data_fim}
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
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProjectDialog;
