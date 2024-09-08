import "./styles.css";
import {inbox} from "./inbox"
import {today} from "./today"
import {myProject} from "./myProject";

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

function Task (){
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



const taskDOM = (title, text) =>{
  const taskDiv = document.createElement("div")
  const task = document.createElement("p");
  const description = document.createElement("p");
  
    task.textContent = title;
    description.textContent = text;
  
    mainBody.appendChild(taskDiv);
    taskDiv.appendChild(task)
    taskDiv.appendChild(description)
  
}

const reset = () =>{
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

