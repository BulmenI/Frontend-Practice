const input = document.getElementById("input");
const inputForm = document.getElementById("form");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const main = document.getElementById("main");
const STATUS = {
    TODO:"todo",
    IN_PROGRESS:"inProgress",
    DONE:"done"
}
    tasks.forEach(task => {
        renderTasks(task);
    });



  dragAndDrop();
function saveTasks(arr) {
    localStorage.setItem("tasks", JSON.stringify(arr));
}

inputForm.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(input.value);

    const task = {
        id:Date.now(),
        text:input.value,
        status:STATUS.TODO,
    }
    tasks.push(task);
    saveTasks(tasks);
    renderTasks(task);
    input.value = "";

});

function createTask(task){

    const li = document.createElement("li");
    li.classList.add("card"); 
    const button = document.createElement("button");
    button.textContent ="X";
    li.textContent = task.text;
    li.dataset.taskId = task.id;
    li.appendChild(button);
    return li;

}

function renderTasks(task) {
    const li = createTask(task);
    let targetUl;
    if (task.status === STATUS.TODO) {
        targetUl = document.getElementById("toDoUl");
    } else if (task.status === STATUS.IN_PROGRESS) {
        targetUl = document.getElementById("inProgressUl");
    } else if (task.status === STATUS.DONE) {
        targetUl = document.getElementById("doneUl");
    }
    targetUl.append(li);
}

main.addEventListener("click", (event) => {
        if(!event.target.closest("button")) return;
    const li = event.target.closest("li");
        if(!li) return;
  const liId = parseInt(li.dataset.taskId);
  const index = tasks.findIndex((task) => task.id === liId);
        tasks.splice(index, 1);
    saveTasks(tasks);
    li.remove();
})

function dragAndDrop() {
    let currentLi;
    let offsetX;
    let offsetY;

    function onMouseMove(event) {
        currentLi.style.left = (event.clientX - offsetX) + "px";
        currentLi.style.top = (event.clientY - offsetY) + "px";
    }

   function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    const ul = event.target.closest("ul");
    if (ul) {
        const task = tasks.find((task) => task.id === parseInt(currentLi.dataset.taskId));
        if (task) {
            task.status = ul.dataset.action;
        }
        saveTasks(tasks);
        ul.append(currentLi);
    }

    console.log(currentLi);
    currentLi.style.position = "";
    currentLi.style.left = "";
    currentLi.style.top = "";
    currentLi.style.pointerEvents = ""; 
    currentLi = null;
}

    main.addEventListener("mousedown", (event) => {
        event.preventDefault();
        if (event.target.closest("button")) return;

        const targetLi = event.target.closest("li");
        if (!targetLi) return;

        const cardCoord = targetLi.getBoundingClientRect();
        offsetX = event.clientX - cardCoord.left;
        offsetY = event.clientY - cardCoord.top;

        currentLi = targetLi;
        targetLi.style.position = "absolute";
        targetLi.style.pointerEvents = "none";

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
}

