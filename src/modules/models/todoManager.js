import { Project } from "./project"
import { format } from "date-fns"

export class TodoManager {
  projects = []
  currentProject = {}

  constructor(){}

  createProject(projectName){
    const newProject = new Project(projectName)
    this.projects.push(newProject);
  }

  deleteProject(projectName){
    return this.projects = this.projects.filter(project => project.name !== projectName)
  }

  setCurrentProject(projectName){
    this.currentProject = this.projects.find(project => project.name === projectName)
  }

  getCurrentProject(){
    console.log(this.currentProject)
    return this.currentProject
  }

  reviveData(data) {
    this.projects = data.map(projectData => {
      const project = new Project(projectData.name);

      projectData.todoList.forEach(todoData => {
        project.addTodo(
          todoData.id, 
          todoData.title, 
          todoData.description, 
          todoData.dueDate, 
          todoData.priority
        );
      });
      return project;
    });
  }


  
}