import { todayData } from "./pageDOM";
import { format } from 'date-fns';


function checkDate(){
  const date = new Date()
const dateFormat = format(new Date(date), "dd-MM-yyyy")
 let storage = JSON.parse(localStorage.getItem("Storage")) || []
 let inbox = storage[0].tasks || []
 let todayTasks = storage[1].tasks || []
 let noRepeat = inbox.filter((item) => !todayTasks.some((task) => task.id === item.id));

  noRepeat.forEach((item) =>{
      if(String(item.date) === String(dateFormat)){
      todayTasks.push(item)
    } 
  })
  
  localStorage.setItem("Storage", JSON.stringify(storage));
}
const today = () => {
 
  const mainPage = document.getElementById("content");
  const todayDiv = document.createElement("div");
  const mainTitle = document.createElement("h1");
  const todayBtn = document.getElementById("today");

  todayBtn.disabled = true;
  todayDiv.className = "title";

  mainTitle.textContent = "Today";

  mainPage.appendChild(todayDiv);
  todayDiv.appendChild(mainTitle);
  checkDate()
  todayData();
};

export { today, checkDate };
