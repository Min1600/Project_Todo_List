import { format, isToday } from 'date-fns'

//Displays data to HTML page
function displayData(storage) {
  const mainBody = document.querySelector(".mainBody");
  //clear page to prevent copies
  mainBody.textContent = "";
 //creates task boxes for each task in localStorage
  storage.map((obj) => {
    const taskDiv = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const date = document.createElement("p");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    const checkbox = document.createElement("input");
    const titleContainer = document.createElement("div");
    const buttonContainer = document.createElement("div");

    //checkbox ability to change when marked and appends to div
    checkBoxData(checkbox, taskDiv);
    //deletebtn ability to delete itself
    deleteButton.onclick = function () {
      deleteData(obj.id);
    };

    editButton.onclick = function () {
      editData(obj);
    };

  //add styling and hover to edit and delete button
 addStyles(editButton, deleteButton, taskDiv)

  //add data/text to page
    title.textContent = obj.title;
    description.textContent = obj.description;
    date.textContent = isToday(obj.date)? "Today": obj.date?format(new Date(obj.date), "dd-MM-yyyy"): "";
    taskDiv.className = "taskBody";
    titleContainer.className = "titleContainer"
    buttonContainer.className = "buttonContainer"
    description.className = "description"
    date.className = "date"

//append data to page
    mainBody.appendChild(taskDiv);
    taskDiv.appendChild(titleContainer);
    taskDiv.appendChild(buttonContainer);
    titleContainer.appendChild(checkbox);
    titleContainer.appendChild(title);
    titleContainer.appendChild(description);;
    titleContainer.appendChild(date);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
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

  function editData(obj){
    let storageJSON = JSON.parse(localStorage.getItem("Storage")) || [];
    let inboxTask = storageJSON[0].tasks || [];;
    //let [,,, ...projects] = storageJSON
    const taskDialog = document.getElementById("editTaskDialog");
    //const projectDialog = document.querySelector(".projectDialog"); 
    const title = document.getElementById("edittitle");
    const description = document.getElementById("editdescription");
    const date = document.getElementById("editdate");
    const addBtn = document.getElementById("editadd");
    let inboxTaskFind = inboxTask.filter((item) => {if(item.id === obj.id)return item.id})
    title.value = obj.title;
    description.value = obj.description;
    date.value = obj.date;
    addBtn.addEventListener("click", () =>{
      inboxTaskFind[0].title = title.value;
      inboxTaskFind[0].date = date.value;
      inboxTaskFind[0].description = description.value
      localStorage.setItem("Storage", JSON.stringify(storageJSON))
    })
    taskDialog.showModal()
    
   
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
        project.location = projectBtn.title
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
      div.style.backgroundColor = "#8df878";
    } else {
      div.style.backgroundColor = "";
    }
  });
}

function addStyles(editButton, deleteButton, div){

  deleteButton.setAttribute('class', 'editDeleteBtn')
  deleteButton.setAttribute('style', 'visibility: visible')
  deleteButton.setAttribute('aria-label', 'Delete')
  deleteButton.innerHTML = `<svg class="editDeleteSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                  </svg>`

  editButton.setAttribute('class', 'editDeleteBtn')
  editButton.setAttribute('style', 'visibility: visible')
  editButton.setAttribute('aria-label', 'Edit')
  editButton.innerHTML = `<svg class='editDeleteSvg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                </svg>`

  div.addEventListener('mouseover', () => {deleteButton.setAttribute("style", "visibility: visible", editButton.setAttribute("style", "visibility: visible"))})
  div.addEventListener('mouseout', () => {deleteButton.setAttribute("style", "visibility: hidden", editButton.setAttribute("style", "visibility: hidden"))})
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
