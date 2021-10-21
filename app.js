//DRY VERSION Dont Repeat Yourself
const todos = [];

const get = (elements) =>
  elements.map((element) => document.getElementById(element));

const [pendingList, completedList, addForm, newTodo] = get([
  "pendingList",
  "completedList",
  "addForm",
  "newTodo",
]);

const newList = [
  {
    element: pendingList,
    status: "pending",
  },
  {
    element: completedList,
    status: "done",
  },
];

const cssClasses = {
  pending:
    "bg-white w-full text-center text-purple-500 rounded py-4 border-2 border-purple-500 transition transform ease-in-out duration -300 hover:bg-purple-500 hover:text-white  hover:scale=110 hover:rotate-1 cursor-pointer",
  done: "bg-white w-full text-center text-blue-500 rounded py-4 border-2 border-blue-500 transition transform ease-in-out duration -300 hover:bg-blue-500 hover:text-white  hover:scale=110 hover:rotate-1 cursor-pointer",
};

const updateTodos = () => {
  newList.forEach((list) => {
    const filteredTodos = todos.filter((todo) => todo.status === list.status);

    list.element.innerHTML = "";
    filteredTodos.forEach((todo) => {
      const item = document.createElement("li");
      item.className = cssClasses[list.status];
      item.innerText = todo.text;
      item.id = todo.id;
      list.element.appendChild(item);
    });
  });
};

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  todos.push({
    id: Math.floor(Math.random() * 100000).toString(),
    text: newTodo.value,
    status: "pending",
  });
  newTodo.value = "";
  updateTodos();
});

pendingList.addEventListener("click", (event) => {
  todos.find((todo) => todo.id === event.target.id).status = "done";
  updateTodos();
});

completedList.addEventListener("click", (event) => {
  todos.find((todo) => todo.id === event.target.id).status = "pending";
  updateTodos();
});
