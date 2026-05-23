export class ProjectView {
  constructor() {
    this.projectList = document.getElementById("projects-list");
    this.currentProjectTitle = document.getElementById("current-project-title");
    this.addProjectButton = document.getElementById("addProject");
    this.projectDialog = document.getElementById("newProjectDialog");
    this.projectForm = this.projectDialog?.querySelector("form");
    this.projectNameInput = this.projectForm?.querySelector("#project-name");
  }

  render(projects = [], activeProjectId = null) {
    if (!this.projectList) {
      return;
    }

    this.projectList.innerHTML = "";

    projects.forEach((project) => {
      const item = document.createElement("li");
      item.className = "projects__item";
      if (project.id === activeProjectId) {
        item.classList.add("projects__item--active");
      }
      item.dataset.projectId = project.id;
      item.textContent = project.name;
      this.projectList.appendChild(item);
    });
  }

  setCurrentTitle(title) {
    if (!this.currentProjectTitle) {
      return;
    }

    this.currentProjectTitle.textContent = title || "No project selected";
  }

  openProjectDialog() {
    if (!this.projectDialog) {
      return;
    }
    this.projectDialog.showModal();
    this.projectNameInput?.focus();
  }

  closeProjectDialog() {
    if (!this.projectDialog) {
      return;
    }
    this.projectDialog.close();
    this.projectForm?.reset();
  }

  bindAddProject(handler) {
    if (!this.addProjectButton) {
      return;
    }

    this.addProjectButton.addEventListener("click", handler);
  }

  bindSaveProject(handler) {
    if (!this.projectForm) {
      return;
    }

    this.projectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = this.projectNameInput?.value.trim();
      if (!name) {
        return;
      }
      handler(name);
      this.closeProjectDialog();
    });
  }

  bindProjectSelect(handler) {
    if (!this.projectList) {
      return;
    }

    this.projectList.addEventListener("click", (event) => {
      const item = event.target.closest(".projects__item");
      if (!item) {
        return;
      }

      handler(item.dataset.projectId);
    });
  }
}
