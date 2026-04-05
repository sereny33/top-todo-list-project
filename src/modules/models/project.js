import { createTodo, Todo } from "./todo";

export class Project {
  name
  todoList = []

  constructor(name){
    this.name = name;
  }

  addTodo(id, title, description, dueDate, priority){
    this.todoList.push(new Todo(id, title, description, dueDate, priority));
  }

  deleteTodo(id){
    this.todoList = this.todoList.filter(todo => todo.id !== id);
  }

  getTodos(){
    console.log(this.todoList)
    return this.todoList
  }

  getTodoById(id) {
    console.log(this.todoList.find(todo => todo.id === id))
    return this.todoList.find(todo => todo.id === id)
  }
}