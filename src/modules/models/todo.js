import { format, parseISO, isValid } from "date-fns"

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
        this.priority = priority
        this.createdDate = new Date;
        
        const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;

        // 2. Проверяем, валидна ли дата, прежде чем форматировать
        if (isValid(dateObj)) {
            this.dueDate = format(dateObj, "dd/MM/yyyy");
        } else {
            this.dueDate = "No date"; // Запасной вариант, чтобы код не падал
        }

    }

    toggleComplete() {
      this.completed = !this.completed;
    }

    update() {
      Object.assign(this, data);
    }
}

