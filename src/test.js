import { format } from "date-fns";

let arr = [
  {
    name: "wrong",
    date: "2024-09-09",
  },
  {
    name: "wrong",
    date: "2024-09-10",
  },
  {
    name: "correct",
    date: "2024-09-15",
  },
  {
    name: "correct2",
    date: "2024-09-15",
  },
];

const date = format(new Date(), "yyyy-MM-dd");

let today = arr.forEach((item) => {
  if (item.date === date) {
    console.log(item);
  }
});

console.log(today);

function removeMessage(id) {
  // iterate through the existing todoList
  // and using filter remove the todo that has an id
  // matching the todo we clicked delete on
  todoList = todoList.filter(function (todo) {
    // only return the ones that don't match
    return todo.id !== id;
  });

  updateTodoList(todoList);
}

function EditMessage(button) {
  const x = document.querySelector("#EditName");
  if (x.contentEditable == "true") {
    x.contentEditable = "false";
    button.innerHTML = "Edit";
  } else {
    x.contentEditable = "true";
    button.innerHTML = "Save";
  }
}

function displayMessages(todoList = []) {
  // Iterate through each todo with map.
  // For each todo return the list item HTML
  const messages = todoList.map(function (todo) {
    return `
       <li id="${todo.id}">
       <button onclick="EditMessage(this);">Edit</button>Name:<span id="EditName" contenteditable="false">${todo.name}</span><br>
         Message:${todo.message}
         <button class="remove" onClick="removeMessage('${todo.id}')">DELETE</button>
       </li>
       `;
  });
}
