//Add Tasks to DOM
function displayData(storage) {
  const mainBody = document.querySelector(".mainBody");
  //clear page to prevent copies
  mainBody.textContent = "";

  storage.map((obj) => {
    const taskDiv = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const date = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const checkbox = document.createElement("input");

    checkBoxData(checkbox, taskDiv);
    deleteBtn.onclick = function () {
      deleteData(obj.id);
    };

    title.textContent = obj.title;
    description.textContent = obj.description;
    date.textContent = obj.date;
    taskDiv.className = "taskBody";
    deleteBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    deleteBtn.className = "deleteBtn";

    mainBody.appendChild(taskDiv);
    taskDiv.appendChild(title);
    taskDiv.appendChild(description);
    taskDiv.appendChild(date);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(deleteBtn);
    taskDiv.appendChild(editBtn);
  });
}

function projectSidebar(obj) {
  const projects = document.querySelector(".projectDiv");
  const newProject = document.createElement("button");

  newProject.textContent = obj.title;
  newProject.className = "projectTab";
  newProject.id = obj.id;
  projects.appendChild(newProject);
}


const sideBarProjects = (id) => {
  const mainPage = document.getElementById("content");
  const projectDiv = document.createElement("div");
  const title = document.createElement("h1");
  const description = document.createElement("p");
  let storageJSON = JSON.parse(localStorage.getItem("Storage")) || [];
  let [,,, ...projects] = storageJSON

  projects.map((item) => {
   if(String(id) === String(item.id)){
      title.textContent = item.title;
      description.textContent = item.description;
      
      projectDiv.className = "title";
      mainPage.appendChild(projectDiv);
      projectDiv.appendChild(title);
      projectDiv.appendChild(description);
   }
   
  });

};

function deleteData(id) {
  let inboxTask = JSON.parse(localStorage.getItem("task")) || [];
  let projectTask = JSON.parse(localStorage.getItem("projectTask")) || [];
  let projectList = JSON.parse(localStorage.getItem("projectList")) || [];

  let inboxTaskFilter = inboxTask.filter((item) => {
    return item.id !== id;
  });
  let projectTaskFilter = projectTask.filter((item) => {
    return item.id !== id;
  });
  let projectListFilter = projectList.filter((item) => {
    return item.id !== id;
  });

  if (inboxTaskFilter.length !== inboxTask.length) {
    localStorage.setItem("task", JSON.stringify(inboxTaskFilter));

    inboxData();
  } else if (projectTaskFilter.length !== projectTask.length) {
    localStorage.setItem("projectTask", JSON.stringify(projectTaskFilter));

    projectTaskData();
  } else if (projectListFilter.length !== projectList.length) {
    localStorage.setItem("projectList", JSON.stringify(projectListFilter));

    projectData();
  }
}

//Add tasks to inbox DOM on page load from localStorage
function inboxData() {
  if (JSON.parse(localStorage.getItem("Storage"))) {
    let data = JSON.parse(localStorage.getItem("Storage")) || [];

    displayData(data[0].tasks);
  }
}

function todayData() {
  //let date = format(new Date(), "yyyy-MM-dd")

  if (JSON.parse(localStorage.getItem("task"))) {
    let data = JSON.parse(localStorage.getItem("task"));

    displayData(data);
  }
}

function projectData() {
  if (JSON.parse(localStorage.getItem("Storage"))) {
    let data = JSON.parse(localStorage.getItem("Storage"));
    let [,,, ...projects] = data

    displayData(projects);
  }
}

function projectTaskData(){
  let storage = JSON.parse(localStorage.getItem("Storage")) || []
  let [,,, ...projects] = storage
 let projectBtn = findProject()

  projects.map((project)=>{
      if(String(project.id) === String(projectBtn.id)){
      displayData(project.tasks)
      }
  })
}

function findProject() {
  const projectBtnList = document.getElementsByClassName("projectTab");
  let projectBtn
 for (let i = 0; i < projectBtnList.length; i++) {
   if(projectBtnList[i].disabled){
     projectBtn = projectBtnList[i]
   }
  }
  return projectBtn
}

function checkBoxData(el, div) {
  el.setAttribute("type", "checkbox");
  el.className = "checkbox";
  el.id = Date.now();

  el.addEventListener("change", () => {
    if (el.checked) {
      div.style.backgroundColor = "green";
    } else {
      div.style.backgroundColor = "";
    }
  });
}

export {
  displayData,
  inboxData,
  todayData,
  projectSidebar,
  projectData,
  sideBarProjects,
  findProject,
  projectTaskData
};
