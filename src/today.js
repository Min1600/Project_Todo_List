import { todayData } from "./pageDOM";
import { format } from 'date-fns';


function checkDate(){
const date = new Date()
const dateFormat = format(new Date(date), "yyyy-MM-dd")
 let storage = JSON.parse(localStorage.getItem("Storage")) || []
 let inbox = storage[0].tasks || []
 let todayTasks = storage[1].tasks || []

  inbox.forEach((item, index) =>{
      if(String(item.date) === String(dateFormat) && todayTasks[index]?.id !== item.id){
      
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
  todayData();
};

export { today, checkDate };
