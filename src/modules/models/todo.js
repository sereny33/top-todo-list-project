import { format } from "date-fns"

/**
 *  1. ‘todos’ are **objects** that should be dynamically created using factories or constructors/classes.
    2.  **todo properties:**
        - id;
        - title;
        - description;
        - dueDate;
        - priority;
        - completed
        - notes (optional);
        - checklist (optional);
        - picture (optional);
        - color picker(optional);
 * 
 * @constructor(title, description, dueDate, priority, completed: false)
 */
export class Todo {
    id
    title 
    description
    dueDate
    priority
    completed = false;
    createdDate

    constructor(id, title, description, dueDate, priority) {
        this.id = id
        this.title = title;
        this.description = description;
        this.dueDate = format(dueDate, "dd/MM/yyyy" );
        this.priority = priority
        this.createdDate = new Date;
    }

    toggleComplete() {
      this.completed = !this.completed;
    }

    update() {
      Object.assign(this, data);
    }
}

