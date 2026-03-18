/**
 *  1. ‘todos’ are **objects** that should be dynamically created using factories or constructors/classes.
    2.  **todo properties:**
        - title;
        - description;
        - dueDate;
        - priority;
        - notes (optional);
        - checklist (optional);
        - picture (optional);
        - color picker(optional);
 * 
 * @constructor(title, description, dueDate, priority, completed: false)
 */
class Todo {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
        this.createdDate = new Date;
    }
}

export function createTodo(title, description, dueDate, priority) {
    return new Todo(title, description, dueDate, priority)
}