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
  let project = JSON.parse(localStorage.getItem("projectList")) || [];

  project.forEach((item) => {
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

export { myProject, sideBarProjects };
