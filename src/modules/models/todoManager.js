import { Project } from "./project"

export class TodoManager {
  projects = []
  currentProject = {}

  constructor(){}

  createProject(project){
    this.projects.push(project);
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


  
}