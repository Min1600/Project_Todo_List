import "./styles.css";
import {inbox} from "./inbox"
import {today} from "./today"
import {myProject} from "./myProject";

const inboxPage = () =>{

    const mainPage = document.querySelector(".mainPage")
    const inboxDiv = document.createElement("div")
    const mainTitle = document.createElement("h1")
    const para = document.createElement("p")
    
    inboxDiv.classList("title")
    para.classList("paraTitle")
    
    mainTitle.textContent = "Inbox"
    para.textContent = "This is where all your tasks will be stored. Feel free to add a new task, set a priority, and pick a due date. If you make a project, you can assign tasks to them, too!"
    
    mainPage.appendChild(inboxDiv)
    inboxDiv.appendChild(mainTitle)
    inboxDiv.appendChild(para)
    }
    
    inboxPage()

const addTaskBtn = document.getElementById("addTask")
const addBtn = document.getElementById("add")
const closeBtn = document.getElementById("close")
const dialog = document.querySelector("dialog")
const inboxBtn = document.getElementById("inbox")
const todayBtn = document.getElementById("today")
const projectBtn = document.getElementById("project")
const upcomingBtn = document.getElementById("upcoming")
const title = document.getElementById("title")
const description = document.getElementById("description")
const date = document.getElementById("date")
const mainBody = document.querySelector(".mainBody")





const Task = function (){
this.title = title.value
this.description = description.value
this.date = date.value
}

const storage = (function (){
  let myTasks = [];
  
  const addTask = () =>{
  let task = new Task()
  myTasks.push(task)}
    
  return{ myTasks, addTask, }
})()



function taskDOM (title, text){
  const taskDiv = document.createElement("div")
  const task = document.createElement("p");
  const description = document.createElement("p");
  
    task.textContent = title;
    description.textContent = text;
  
    mainBody.appendChild(taskDiv);
    taskDiv.appendChild(task)
    taskDiv.appendChild(description)
  
}

function reset(){
  title.value = ""
  description.value = ""
}

addTaskBtn.addEventListener("click", () => {dialog.showModal()})
closeBtn.addEventListener("click", (event) =>{ event.preventDefault(); dialog.close(); reset()})
addBtn.addEventListener("click", (event) => 
    {event.preventDefault(); storage.addTask(); 
        taskDOM(storage.myTasks[storage.myTasks.length-1].title, storage.myTasks[storage.myTasks.length-1].description);
        reset();
    })
