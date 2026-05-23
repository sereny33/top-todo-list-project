export class Storage {
  constructor(storageKey = "top-todo-list-data") {
    this.storageKey = storageKey;
  }

  save(state) {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn("Unable to parse saved state:", error);
      return null;
    }
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}
