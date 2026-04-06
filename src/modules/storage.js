export class Storage {

  constructor() {
  };

  saveProjects(data) {
    localStorage.setItem('data', JSON.stringify(data))
  }

  loadProjects(){
    return JSON.parse(localStorage.getItem('data'))
  }
} 