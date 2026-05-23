export class TodoView {
  constructor() {
    this.todoList = document.getElementById("todo-list");
    this.addTodoButton = document.getElementById("addTodo");
    this.deleteProjectButton = document.getElementById("deleteProject");
    this.dialog = document.getElementById("newTodoDialog");
    this.form = this.dialog.querySelector("form");
    this.titleInput = this.form.querySelector("#todo-title");
    this.descriptionInput = this.form.querySelector("#todo-description");
    this.dueDateInput = this.form.querySelector("#todo-dueDate");
    this.prioritySelect = this.form.querySelector("#todo-priority");
    this.template = document.getElementById("card-template");
    this.placeholder = document.getElementById("content-placeholder");
    this.emptyTodoMessage = document.getElementById("empty-todo-list");
    this.overview = document.querySelector(".todo__overview");
  }

  renderTodos(project) {
    this.todoList.innerHTML = "";

    if (!project) {
      this.showNoProjectPlaceholder();
      return;
    }

    this.hideNoProjectPlaceholder();
    this.addTodoButton.disabled = false;
    this.deleteProjectButton.disabled = false;

    if (project.todoList.length === 0) {
      this.emptyTodoMessage.classList.remove("hidden");
      this.todoList.classList.add("hidden");
      this.overview.classList.add("hidden");
      return;
    }

    this.emptyTodoMessage.classList.add("hidden");
    this.todoList.classList.remove("hidden");
    this.overview.classList.remove("hidden");

    project.todoList.forEach((todo) => {
      const card = this.createTodoCard(todo);
      this.todoList.appendChild(card);
    });
  }

  showNoProjectPlaceholder() {
    this.placeholder.classList.remove("hidden");
    this.todoList.classList.add("hidden");
    this.overview.classList.add("hidden");
    this.emptyTodoMessage.classList.add("hidden");
    this.addTodoButton.disabled = true;
    this.deleteProjectButton.disabled = true;
  }

  hideNoProjectPlaceholder() {
    this.placeholder.classList.add("hidden");
  }

  createTodoCard(todo) {
    const clone = this.template.content.cloneNode(true);
    const card = clone.firstElementChild;

    card.dataset.todoId = todo.id;
    const badge = card.querySelector(".todo-card__badge");
    badge.textContent = todo.priority;
    badge.classList.add(`todo-card__badge--${todo.priority}`);
    card.querySelector(".todo-card__title").textContent = todo.title;
    card.querySelector(".todo-card__description").textContent = todo.description;
    card.querySelector(".todo-card__due-date").textContent = todo.dueDate ? `Due ${todo.dueDateLabel}` : "No due date";
    card.querySelector(".todo-card__created").textContent = `Created ${new Date(todo.createdDate).toLocaleDateString()}`;

    const checkbox = card.querySelector('input[name="completed"]');
    checkbox.checked = todo.completed;
    checkbox.classList.add("todo-card__completed");

    return card;
  }

  bindAddTodo(saveTodoHandler) {
    if (!this.addTodoButton) {
      return;
    }

    this.addTodoButton.addEventListener("click", () => {
      this.dialog.showModal();
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this.getFormData();
      saveTodoHandler(formData);
      this.form.reset();
      this.dialog.close();
    });
  }

  bindDeleteProject(handler) {
    if (!this.deleteProjectButton) {
      return;
    }

    this.deleteProjectButton.addEventListener("click", handler);
  }

  bindTodoActions({ onToggle, onDelete }) {
    this.todoList.addEventListener("click", (event) => {
      const deleteButton = event.target.closest(".todo-card__delete-button");
      if (!deleteButton) {
        return;
      }

      const card = deleteButton.closest(".todo-card");
      onDelete(card.dataset.todoId);
    });

    this.todoList.addEventListener("change", (event) => {
      if (!event.target.matches(".todo-card__completed")) {
        return;
      }

      const card = event.target.closest(".todo-card");
      onToggle(card.dataset.todoId);
    });
  }

  getFormData() {
    return {
      title: this.titleInput.value.trim(),
      description: this.descriptionInput.value.trim(),
      dueDate: this.dueDateInput.value || null,
      priority: this.prioritySelect.value || "low",
    };
  }
}
