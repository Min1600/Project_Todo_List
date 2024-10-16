import "./styles.css";
import { today } from "./today";
import { myProject } from "./myProject";
import { storage } from "./storage";
import { displayData, inboxData, projectSidebar, sideBarProjects, projectTaskData } from "./pageDOM";

const addTaskBtn = document.getElementById("addTask");
const addBtn = document.getElementById("add");
const closeBtn = document.getElementById("close");
const taskDialog = document.querySelector(".taskDialog");
const projectDialog = document.querySelector(".projectDialog");
const projectBtn = document.getElementById("projectbtn");
const addProjectBtn = document.getElementById("addProject");
const closeProjectBtn = document.getElementById("closeProject");
const inboxBtn = document.getElementById("inbox");
const myProjectBtn = document.getElementById("project");
const todayBtn = document.getElementById("today");
const upcomingBtn = document.getElementById("upcoming");
const sidebarBtnList = document.querySelectorAll(".navbtn");
const projectBtnList = document.getElementsByClassName("projectTab");
const mainBody = document.querySelector(".mainBody");
const pageButtons = document.querySelector(".sidebar");
const mainPage = document.getElementById("content");
const inboxDiv = document.createElement("div");
const mainTitle = document.createElement("h1");
const inboxContent = document.createElement("div");

function inboxDOM() {
  //curent page button disabled and highlighted
  inboxBtn.disabled = true;
  inboxDiv.className = "title";
  inboxContent.className = "inboxContent";

  //default title and text of current page
  mainTitle.textContent = "Inbox";

  //appends current page text to main page
  mainPage.appendChild(inboxDiv);
  inboxDiv.appendChild(mainTitle);
}

function clearPage() {
  mainPage.textContent = "";
  mainBody.textContent = "";
}

function projectBtnDisable() {
  sidebarBtnList.forEach((item) => (item.disabled = false));

  for (let i = 0; i < projectBtnList.length; i++) {
    projectBtnList[i].disabled = false;
  }
}

function buttonEventListeners() {
  //Switch Page buttons
  pageButtons.addEventListener("click", (e) => {
    if (e.target.id === "inbox") {
      clearPage();
      projectBtnDisable();
      inbox();
    } else if (e.target.id === "today") {
      clearPage();
      projectBtnDisable();
      today();
    } else if (e.target.id === "project") {
      clearPage();
      projectBtnDisable();
      myProject();
    } else if (e.target.className === "projectTab") {
      clearPage();
      projectBtnDisable();
      sideBarProjects(e.target.id);
      e.target.disabled = true;
      projectTaskData()
    }
  });
}

function inbox() {
  inboxDOM();
  inboxData();
  buttonEventListeners();
}

inbox();

window.onload = () => {
  let JSONdata = JSON.parse(localStorage.getItem("Storage"))

  if(!JSONdata){
let template = [
  
{
  title: "Tasks",
  tasks: []
},

{
  title: "Today",
  tasks: []
},

{
  title: "Upcoming",
  tasks: []
}

]
  localStorage.setItem("Storage", JSON.stringify(template));
  }

  let storageJSON = JSON.parse(localStorage.getItem("Storage")) || []
  let [,,, ...projects] = storageJSON


    projects.forEach((item) => {
      projectSidebar(item);
    });
  
};

function defaultDialogClose(event, dialog) {
  event.preventDefault();
  storage.reset();
  dialog.close();
}

//For Tasks
addTaskBtn.addEventListener("click", () => {
  taskDialog.showModal();
});
closeBtn.addEventListener("click", (event) => {
  defaultDialogClose(event, taskDialog);
});
addBtn.addEventListener("click", (event) => {
  if (
    inboxBtn.disabled === false &&
    myProjectBtn.disabled === false &&
    todayBtn.disabled === false &&
    upcomingBtn.disabled === false
  ) {
    storage.projectTaskJSON();
    defaultDialogClose(event, taskDialog);
   
  } else {
    storage.inboxStorageJSON();
    let storageJSON = JSON.parse(localStorage.getItem("Storage"))
    displayData(storageJSON[0].tasks);
    defaultDialogClose(event, taskDialog);
  }
});

//For Projects
projectBtn.addEventListener("click", () => {
  projectDialog.showModal();
});
closeProjectBtn.addEventListener("click", (event) => {
  defaultDialogClose(event, projectDialog);
});
addProjectBtn.addEventListener("click", (event) => {
  storage.projectStorageJSON();
  defaultDialogClose(event, projectDialog);
  projectSidebar(
    JSON.parse(localStorage.getItem("Storage"))[
      JSON.parse(localStorage.getItem("Storage")).length - 1
    ],
  );
});
