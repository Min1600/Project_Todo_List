import { projectData, projectTaskData } from "./pageDOM";

const myProject = () => {
  const mainPage = document.getElementById("content");
  const projectDiv = document.createElement("div");
  const mainTitle = document.createElement("h1");
  const projectBtn = document.getElementById("project");
  const addTaskBtn = document.getElementById("addTask");

  projectBtn.disabled = true;
  projectDiv.className = "title";
  addTaskBtn.disabled = true;

  mainTitle.textContent = "My Projects";

  mainPage.appendChild(projectDiv);
  projectDiv.appendChild(mainTitle);

  projectData();
};

const sideBarProjects = (id) => {
  const mainPage = document.getElementById("content");
  const projectDiv = document.createElement("div");
  const title = document.createElement("h1");
  const description = document.createElement("p");
  let projects = JSON.parse(localStorage.getItem("ProjectList")) || [];


  projects.forEach((item) => {
    if (item.title === id) {
      title.textContent = item.title;
      description.textContent = item.description;
    }
  });

  projectDiv.className = "title";
  mainPage.appendChild(projectDiv);
  projectDiv.appendChild(title);
  projectDiv.appendChild(description);

  projectTaskData();
};

function projectSidebar(obj) {
  const projects = document.querySelector(".projectDiv");
  const newProject = document.createElement("button");

  newProject.textContent = obj.title;
  newProject.className = "projectTab";
  newProject.id = obj.title;
  projects.appendChild(newProject);
}

export { myProject, sideBarProjects, projectSidebar };
