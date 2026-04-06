export class UI {
  constructor() {
    this.container = document.querySelector("#container");
    this.cardTemplate = document.getElementById("card-template");
  }

  createCard(todo) {
    const clone = this.cardTemplate.content.cloneNode(true);
    const card = clone.firstElementChild;

    card.querySelector(".title").textContent = todo.title;
    card.querySelector(".dueDate").textContent =
      `Due to: ${new Date(todo.dueDate).toLocaleDateString()}`;

    return card;
  }

  render(project) {
    this.container.innerHTML = "";

    project.todoList.forEach((todo) => {
      const card = this.createCard(todo);
      this.container.appendChild(card);
    });
  }
}
