//module for task storage using JSON
const storage = (function () {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const date = document.getElementById("date");
  const projectTitle = document.getElementById("project-title");
  const projectDescription = document.getElementById("project-description");

  //constructor for input values
  const Task = function () {
    this.title = title.value;
    this.description = description.value;
    this.date = date.value;
    this.id = Date.now();
  };

  const Project = function () {
    this.title = projectTitle.value;
    this.description = projectDescription.value;
    this.id = Date.now();
  };

  const ProjectTask = function () {
    this.title = title.value;
    this.description = description.value;
    this.date = date.value;
    this.id = Date.now();
  };

  //push task to localStorage array
  function addTask(arr) {
    let task = new Task();
    arr.push(task);
  }

  function addProject(arr) {
    let task = new Project();
    arr.push(task);
  }
  function addProjectTask(arr) {
    let task = new ProjectTask();
    arr.push(task);
  }
  //arranges tasks by order of creation
  function push(arr, arr2) {
    arr.forEach((item, index) => arr2.splice(index, 0, item));
  }

  //uses addTask and push functions to store tasks in localStorage
  function inboxStorageJSON() {
    let storage = JSON.parse(localStorage.getItem("Storage"))
    let myTasks = storage[0].tasks
     addTask(myTasks)

    localStorage.setItem("Storage", JSON.stringify(storage));
    
  }

  //uses addProject and push functions to store projects in localStorage
  function projectStorageJSON() {
    let storage = JSON.parse(localStorage.getItem("Storage"))
    addProject(storage)

    localStorage.setItem("Storage", JSON.stringify(storage));
  }

  function projectTaskJSON() {
    let projectTasks = [];

    if (JSON.parse(localStorage.getItem("projectTask"))) {
      let project = JSON.parse(localStorage.getItem("projectTask"));
      addProjectTask(projectTasks);
      push(project, projectTasks);
      localStorage.setItem("projectTask", JSON.stringify(projectTasks));
    } else {
      addProjectTask(projectTasks);
      localStorage.setItem("projectTask", JSON.stringify(projectTasks));
    }
  }

  function reset() {
    title.value = "";
    description.value = "";
    date.value = "";
    projectTitle.value = "";
    projectDescription.value = "";
  }

  return { inboxStorageJSON, projectStorageJSON, projectTaskJSON, reset };
})();

export { storage };
