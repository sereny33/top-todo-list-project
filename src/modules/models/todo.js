import { format, parseISO, isValid } from "date-fns";

const PRIORITY_VALUES = ["low", "medium", "high"];
const DEFAULT_PRIORITY = "low";

function createId(prefix = "todo") {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export class Todo {
  id;
  title;
  description;
  dueDate;
  priority;
  completed = false;
  createdDate;

  constructor({ id, title, description = "", dueDate = null, priority = DEFAULT_PRIORITY, completed = false, createdDate = null }) {
    if (!title) {
      throw new Error("Todo title is required");
    }

    this.id = id || createId();
    this.title = title;
    this.description = description;
    this.priority = PRIORITY_VALUES.includes(priority) ? priority : DEFAULT_PRIORITY;
    this.completed = Boolean(completed);
    this.dueDate = this.normalizeDate(dueDate);
    this.createdDate = createdDate ? new Date(createdDate).toISOString() : new Date().toISOString();
  }

  normalizeDate(value) {
    if (!value) {
      return null;
    }

    const date = typeof value === "string" ? parseISO(value) : new Date(value);
    return isValid(date) ? format(date, "yyyy-MM-dd") : null;
  }

  get dueDateLabel() {
    if (!this.dueDate) return "No date";
    return format(parseISO(this.dueDate), "MMM d, yyyy");
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  update(data = {}) {
    if (data.title !== undefined) {
      this.title = data.title;
    }
    if (data.description !== undefined) {
      this.description = data.description;
    }
    if (data.priority !== undefined && PRIORITY_VALUES.includes(data.priority)) {
      this.priority = data.priority;
    }
    if (data.dueDate !== undefined) {
      this.dueDate = this.normalizeDate(data.dueDate);
    }
    if (data.completed !== undefined) {
      this.completed = Boolean(data.completed);
    }
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      completed: this.completed,
      createdDate: this.createdDate,
    };
  }

  static fromJSON(data = {}) {
    return new Todo(data);
  }
}

