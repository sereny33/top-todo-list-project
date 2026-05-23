import { Project } from "./project";

export class ProjectManager {
  projects = [];
  currentProjectId = null;

  constructor(state = null) {
    if (state) {
      this.loadFromJSON(state);
    }
  }

  createProject(name) {
    const normalized = name?.trim();
    if (!normalized) {
      throw new Error("Project name is required");
    }

    if (this.projects.some((project) => project.name === normalized)) {
      console.warn(`Project ${normalized} already exists`);
      return null;
    }

    const project = new Project({ name: normalized });
    this.projects.push(project);

    if (!this.currentProjectId) {
      this.currentProjectId = project.id;
    }

    return project;
  }

  getProjectById(projectId) {
    return this.projects.find((project) => project.id === projectId) ?? null;
  }

  getProjectByName(name) {
    return this.projects.find((project) => project.name === name) ?? null;
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);

    if (this.currentProjectId === projectId) {
      this.currentProjectId = this.projects[0]?.id ?? null;
    }

    return this.projects;
  }

  setCurrentProject(projectId) {
    const project = this.getProjectById(projectId);
    if (project) {
      this.currentProjectId = projectId;
    }
    return project;
  }

  getCurrentProject() {
    return this.getProjectById(this.currentProjectId);
  }

  addTodo(projectId, todoData) {
    const project = this.getProjectById(projectId);
    return project ? project.addTodo(todoData) : null;
  }

  deleteTodo(projectId, todoId) {
    const project = this.getProjectById(projectId);
    if (project) {
      project.deleteTodo(todoId);
    }
  }

  loadFromJSON(state = {}) {
    this.projects = (state.projects ?? []).map(Project.fromJSON);
    this.currentProjectId = state.currentProjectId ?? this.projects[0]?.id ?? null;
  }

  toJSON() {
    return {
      projects: this.projects.map((project) => project.toJSON()),
      currentProjectId: this.currentProjectId,
    };
  }

  static fromJSON(state) {
    return new ProjectManager(state);
  }
}
