import "./styles.css";

import { Project } from "./modules/models/project";
import { TodoManager } from "./modules/models/todoManager";

const projectSerega1 = new Project('serega1')
const projectSerega2 = new Project('serega2')
const projectSerega3 = new Project('serega3')

projectSerega1.addTodo(1,    
    'Спортзал', 
    'Тренировка ног и кардио 30 минут.', 
    '2026-04-16', 
    'low')
projectSerega1.addTodo(2,    
    'Позвонить родителям', 
    'Узнать как дела и договориться о встрече на выходных.', 
    '2026-04-14', 
    'high')
projectSerega2.addTodo(3,    
    'Проект на JS', 
    'Реализовать удаление задач и сохранение в LocalStorage.', 
    '2026-04-20', 
    'medium')
projectSerega2.addTodo(4, 
    'Купить продукты', 
    'Взять молоко, хлеб, сыр и овощи для салата на ужин.', 
    '2026-04-15', 
    'high')
projectSerega3.addTodo(4, 
    'Купить продукты', 
    'Взять молоко, хлеб, сыр и овощи для салата на ужин.', 
    '2026-04-15', 
    'high')
projectSerega3.addTodo(4, 
    'Купить продукты', 
    'Взять молоко, хлеб, сыр и овощи для салата на ужин.', 
    '2026-04-15', 
    'high')

const manager = new TodoManager()

manager.createProject(projectSerega1)
manager.createProject(projectSerega2)
manager.createProject(projectSerega3)

console.log(manager.projects);

manager.deleteProject('serega2');
console.log(manager.projects);

manager.setCurrentProject('serega1')

const currentProj = manager.getCurrentProject()
currentProj.getTodos()