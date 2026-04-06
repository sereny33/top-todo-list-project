import "./styles.css";

import { TodoManager } from "./modules/models/todoManager";
import { Storage } from "./modules/storage";

const manager = new TodoManager();
const storage = new Storage();


// // 1. Очищаем старые поломанные данные
// localStorage.clear();

// // 2. Создаем 5 проектов с задачами
// manager.createProject("Работа");
// manager.setCurrentProject("Работа");
// let work = manager.getCurrentProject();
// work.addTodo(
//   101,
//   "Отчет",
//   "Подготовить квартальный отчет",
//   "2026-04-10",
//   "high",
// );
// work.addTodo(
//   102,
//   "Митинг",
//   "Встреча с командой по дизайну",
//   "2026-04-11",
//   "low",
// );

// manager.createProject("Дом");
// manager.setCurrentProject("Дом");
// let home = manager.getCurrentProject();
// home.addTodo(
//   201,
//   "Уборка",
//   "Помыть окна и пропылесосить",
//   "2026-04-12",
//   "medium",
// );

// manager.createProject("Учеба");
// manager.setCurrentProject("Учеба");
// let study = manager.getCurrentProject();
// study.addTodo(
//   301,
//   "Курс JS",
//   "Закончить модуль про LocalStorage",
//   "2026-04-07",
//   "high",
// );

// manager.createProject("Здоровье");
// manager.setCurrentProject("Здоровье");
// let health = manager.getCurrentProject();
// health.addTodo(
//   401,
//   "Стоматолог",
//   "Плановый осмотр в 15:00",
//   "2026-04-20",
//   "high",
// );

// manager.createProject("Хобби");
// manager.setCurrentProject("Хобби");
// let hobby = manager.getCurrentProject();
// hobby.addTodo(
//   501,
//   "Гитара",
//   "Выучить соло из Stairway to Heaven",
//   "2026-05-01",
//   "low",
// );

// // 3. Сохраняем все в Storage
// storage.saveProjects(manager.projects);

// console.log("Тестовые данные созданы и сохранены!");


const savedProjects = storage.loadProjects();

if (savedProjects && savedProjects.length > 0) {
  manager.reviveData(savedProjects);
} else {
  manager.createProject("Starter Project");
  manager.setCurrentProject("Starter Project");
}

console.log(manager.projects);

