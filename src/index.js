import "./styles.css";

import { ProjectManager } from "./modules/models/todoManager";
import { ProjectView } from "./modules/view/projectView";
import { TodoView } from "./modules/view/todoView";
import { Storage } from "./modules/storage";
import { AppPresenter } from "./modules/presenter";


const projectManager = new ProjectManager();
const projectView = new ProjectView();
const todoView = new TodoView();
const storage = new Storage();

const appPresenter = new AppPresenter({
  projectManager,
  projectView,
  todoView,
  storage,
});

appPresenter.init();
