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
  const projects = document.getElementById("projectID");
  const newProject = document.createElement("button");

  newProject.textContent = obj.title;
  newProject.className = "projectTab";
  newProject.id = obj.id;
  projects.appendChild(newProject);


}

function sideBarLoad() {
  let storage = JSON.parse(localStorage.getItem("Storage")) || []
  let [,,, ...projects] = storage


    projects.forEach((item) => {
      projectSidebar(item);
    });
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

function deleteSidebarBtn(){
  const projectBtn = document.getElementsByClassName("projectTab")

  while (projectBtn.length > 0) {
    projectBtn[0].remove();
  }
}

function deleteData(id) {
  const sideBarBtn = document.getElementsByClassName("navbtn")
  let selectedBtn = sideBarBtn.map((item) => item.disabled === true)
  let storageJSON = JSON.parse(localStorage.getItem("Storage")) || [];
  let inboxTask = storageJSON[0].tasks || [];;
  let todayTask = storageJSON[1].tasks || [];;
  let [,,, ...projects] = storageJSON;


  //Find selected task
  let inboxTaskFilter = inboxTask.filter((item) => item.id !== id);
  let todayTaskFilter = todayTask.filter((item) => item.id !== id);

  if (inboxTaskFilter.length !== inboxTask.length) {
    storageJSON[0].tasks = inboxTaskFilter;
    localStorage.setItem("Storage", JSON.stringify(storageJSON));

    if(todayTaskFilter.length !== todayTask.length){
      storageJSON[1].tasks = todayTaskFilter;
      localStorage.setItem("Storage", JSON.stringify(storageJSON));
      if(selectedBtn.id === "today"){
      todayData()
    }else{
    inboxData();  // Update page view
    }  
  }}
   

    projects.forEach((project) => {
      //Find selected project
      let projectTaskFilter = project.tasks.filter((task) => task.id !== id);

      if (projectTaskFilter.length !== project.tasks.length) {
        project.tasks = projectTaskFilter;  // Update the tasks of the project
        localStorage.setItem("Storage", JSON.stringify(storageJSON));  // Save the updated data
        projectTaskData();  // Update page view
      
      }
    });
  
    //Find selected task
    let projectsFilter = projects.filter((project) => project.id !== id);
    if (projectsFilter.length !== projects.length) {
      storageJSON = [...storageJSON.slice(0, 3), ...projectsFilter];
      localStorage.setItem("Storage", JSON.stringify(storageJSON));
      deleteSidebarBtn()
      sideBarLoad()
      projectData();  // Update page view
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

  if (JSON.parse(localStorage.getItem("Storage"))) {
    let data = JSON.parse(localStorage.getItem("Storage")) || [];
    
    displayData(data[1].tasks);
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
  projectTaskData,
  sideBarLoad
};
