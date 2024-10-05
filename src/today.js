import {todayData} from "./pageDOM"

const today = () =>{
    const mainPage = document.getElementById("content")
    const todayDiv = document.createElement("div")
    const mainTitle = document.createElement("h1")
    const todayBtn = document.getElementById("today")

    todayBtn.disabled = true;
    todayDiv.className = "title"

    mainTitle.textContent = "Today"

    mainPage.appendChild(todayDiv)
    todayDiv.appendChild(mainTitle)

    todayData()
}

export{today}