export class ProjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProjectError";
  }
}

export class ProjectNotFoundError extends ProjectError {
  constructor() {
    super("Projeto não encontrado.");
  }
}

export class ProjectNameExistsError extends ProjectError {
  constructor() {
    super("Projeto com o mesmo nome já existe.");
  }
}

export class ProjectNotCompletedError extends ProjectError {
  constructor() {
    super("Não é possível remover projetos não concluídos.");
  }
}

export class ProjectHasUsersError extends ProjectError {
  constructor() {
    super("Remova todos os usuários antes de deletar o projeto.");
  }
}
