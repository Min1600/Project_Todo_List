//Displays data to HTML page
function displayData(storage) {
  const mainBody = document.querySelector(".mainBody");
  //clear page to prevent copies
  mainBody.textContent = "";
 //goes over each locaStorage array entered
  storage.map((obj) => {
    const taskDiv = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const date = document.createElement("p");
    const location = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const checkbox = document.createElement("input");

    //checkbox ability to change when marked and appends to div
    checkBoxData(checkbox, taskDiv);
    //deletebtn ability to delete itself
    deleteBtn.onclick = function () {
      deleteData(obj.id);
    };
  //add data and attributes to correct elements
    title.textContent = obj.title;
    description.textContent = obj.description;
    date.textContent = obj.date;
    location.textContent = obj.location
    taskDiv.className = "taskBody";
    deleteBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    deleteBtn.className = "deleteBtn";
//append data to HTML page
    mainBody.appendChild(taskDiv);
    taskDiv.appendChild(title);
    taskDiv.appendChild(description);
    taskDiv.appendChild(date);
    taskDiv.appendChild(location);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(deleteBtn);
    taskDiv.appendChild(editBtn);
    
  });
}
//creating and displaying project buttons on sidebar
function projectSidebar(obj) {
  const projects = document.getElementById("projectID");
  const newProject = document.createElement("button");

  newProject.textContent = obj.title;
  newProject.className = "projectTab";
  newProject.id = obj.id;
  projects.appendChild(newProject);
}
//displaying project buttons on page load
function sideBarLoad() {
  let storage = JSON.parse(localStorage.getItem("Storage")) || []
  let [,,, ...projects] = storage


    projects.forEach((item) => {
      projectSidebar(item);
    });
}
//creating and displaying projects on main HTML page
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
//removing project buttons from sidebar
function deleteSidebarBtn(){
  const projectBtn = document.getElementsByClassName("projectTab")

  while (projectBtn.length > 0) {
    projectBtn[0].remove();
  }
}
//delete tasks from HTML and localStorage
function deleteData(id) {
  let confirmation = confirm("Are you sure you want to delete?")
  if(confirmation){
 let sideBarBtn = document.getElementsByClassName("navbtn")
  let selectedBtn
  let storageJSON = JSON.parse(localStorage.getItem("Storage")) || [];
  let inboxTask = storageJSON[0].tasks || [];;
  let todayTask = storageJSON[1].tasks || [];;
  let [,,, ...projects] = storageJSON;
//Which page user is on
  for(let i=0; i<sideBarBtn.length; i++){
    if(sideBarBtn[i].disabled){
selectedBtn = sideBarBtn[i].id
    }
  }
  //Find selected task
  let inboxTaskFilter = inboxTask.filter((item) => item.id !== id);
  let todayTaskFilter = todayTask.filter((item) => item.id !== id);
//gets rid of selected task for inbox
  if (inboxTaskFilter.length !== inboxTask.length) {
    storageJSON[0].tasks = inboxTaskFilter;
    localStorage.setItem("Storage", JSON.stringify(storageJSON));
   
    }
//gets rid of selected task for today
    if(todayTaskFilter.length !== todayTask.length){
      storageJSON[1].tasks = todayTaskFilter;
      localStorage.setItem("Storage", JSON.stringify(storageJSON));
    }
    //displays page user is on
      if(selectedBtn === "today"){
      todayData()// Update page view
    }else{
    inboxData();  // Update page view
    }
  
    projects.forEach((project) => {
      //Find selected project
      let projectTaskFilter = project.tasks.filter((task) => task.id !== id);
//gets rid of selected project task
      if (projectTaskFilter.length !== project.tasks.length) {
        project.tasks = projectTaskFilter;  // Update the tasks of the project
        localStorage.setItem("Storage", JSON.stringify(storageJSON));  // Save the updated data
        projectTaskData();  // Update page view
      
      }
    });
  
    //Find selected task
    let projectsFilter = projects.filter((project) => project.id !== id);
    //gets rid of selected project
    if (projectsFilter.length !== projects.length) {
      storageJSON = [...storageJSON.slice(0, 3), ...projectsFilter];
      localStorage.setItem("Storage", JSON.stringify(storageJSON));
      deleteSidebarBtn()
      sideBarLoad()
      projectData();  // Update page view
    }
  }else{
    return
  }
  }

//Display data from localStorage
function inboxData() {
  if (JSON.parse(localStorage.getItem("Storage"))) {
    let data = JSON.parse(localStorage.getItem("Storage")) || [];

    displayData(data[0].tasks);
  }
}

function todayData() {
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

  projects.forEach((project)=>{
      if(String(project.id) === String(projectBtn.id)){
      displayData(project.tasks)
      }
  })
}
//Find selected project
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
//give checkbox attributes and interactivity
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
