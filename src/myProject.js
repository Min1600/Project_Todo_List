import { projectData} from "./pageDOM";

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





export { myProject};
