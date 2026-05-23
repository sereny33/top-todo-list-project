import { Todo } from "./todo";

const DEFAULT_PROJECT_PREFIX = "project";

function createProjectId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${DEFAULT_PROJECT_PREFIX}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export class Project {
  id;
  name;
  todoList = [];

  constructor({ id, name, todoList = [] } = {}) {
    if (!name) {
      throw new Error("Project name is required");
    }

    this.id = id || createProjectId();
    this.name = name;
    this.todoList = todoList.map((todo) => (todo instanceof Todo ? todo : Todo.fromJSON(todo)));
  }

  addTodo(todoData) {
    const todo = todoData instanceof Todo ? todoData : new Todo(todoData);
    this.todoList.push(todo);
    return todo;
  }

  deleteTodo(todoId) {
    this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
  }

  toggleTodo(todoId) {
    const todo = this.getTodoById(todoId);
    if (todo) {
      todo.toggleComplete();
    }
    return todo;
  }

  getTodos() {
    return [...this.todoList];
  }

  getTodoById(todoId) {
    return this.todoList.find((todo) => todo.id === todoId) ?? null;
  }

  updateTodo(todoId, updateData) {
    const todo = this.getTodoById(todoId);
    if (todo) {
      todo.update(updateData);
    }
    return todo;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      todoList: this.todoList.map((todo) => todo.toJSON()),
    };
  }

  static fromJSON(data = {}) {
    return new Project({ id: data.id, name: data.name, todoList: data.todoList ?? [] });
  }
}