export class AppPresenter {
  constructor({ projectManager, projectView, todoView, storage }) {
    this.projectManager = projectManager;
    this.projectView = projectView;
    this.todoView = todoView;
    this.storage = storage;
  }

  init() {
    const savedState = this.storage.load();

    if (savedState && Array.isArray(savedState.projects) && savedState.projects.length > 0) {
      this.projectManager.loadFromJSON(savedState);
    }

    this.projectView.bindAddProject(this.handleOpenProjectDialog.bind(this));
    this.projectView.bindSaveProject(this.handleSaveProject.bind(this));
    this.projectView.bindProjectSelect(this.handleProjectSelect.bind(this));
    this.todoView.bindAddTodo(this.handleSaveTodo.bind(this));
    this.todoView.bindDeleteProject(this.handleDeleteProject.bind(this));
    this.todoView.bindTodoActions({
      onToggle: this.handleToggleTodo.bind(this),
      onDelete: this.handleDeleteTodo.bind(this),
    });

    this.render();
  }

  render() {
    const currentProject = this.projectManager.getCurrentProject();
    this.projectView.render(this.projectManager.projects, this.projectManager.currentProjectId);
    this.projectView.setCurrentTitle(currentProject?.name || "No project selected");
    this.todoView.renderTodos(currentProject);
  }

  persist() {
    this.storage.save(this.projectManager.toJSON());
  }

  handleOpenProjectDialog() {
    this.projectView.openProjectDialog();
  }

  handleSaveProject(name) {
    const project = this.projectManager.createProject(name);
    if (!project) {
      return;
    }
    this.persist();
    this.render();
  }

  handleDeleteProject() {
    const currentProject = this.projectManager.getCurrentProject();
    if (!currentProject) {
      return;
    }

    this.projectManager.deleteProject(currentProject.id);
    this.persist();
    this.render();
  }

  handleProjectSelect(projectId) {
    this.projectManager.setCurrentProject(projectId);
    this.render();
  }

  handleSaveTodo(todoData) {
    const currentProject = this.projectManager.getCurrentProject();
    if (!currentProject) {
      return;
    }

    currentProject.addTodo(todoData);
    this.persist();
    this.render();
  }

  handleToggleTodo(todoId) {
    const currentProject = this.projectManager.getCurrentProject();
    if (!currentProject) {
      return;
    }

    currentProject.toggleTodo(todoId);
    this.persist();
    this.render();
  }

  handleDeleteTodo(todoId) {
    const currentProject = this.projectManager.getCurrentProject();
    if (!currentProject) {
      return;
    }

    currentProject.deleteTodo(todoId);
    this.persist();
    this.render();
  }
}
