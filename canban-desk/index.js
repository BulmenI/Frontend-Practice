const input = document.getElementById("input");
const inputStartTime = document.getElementById("inputTimeStart");
const inputEndTime = document.getElementById("inputTimeEnd");
const inputForm = document.getElementById("form");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const main = document.getElementById("main");
const modal = document.getElementById("modal");
const timeLogicModal = document.getElementById("timeLogicModal");
const deleteModal = document.getElementById("deleteConfirmationModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const closeTimeLogicModal = document.getElementById("closeTimeLogicModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeBtn");
const inputPriority = document.getElementById("inputPriority");

let taskId = null;

const STATUS = {
    TODO: "todo",
    IN_PROGRESS: "inProgress",
    DONE: "done"
}

const PRIORITY = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
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

    if (inputEndTime.value < inputStartTime.value) {
        timeLogicModal.showModal();
        return;
    }

    const task = {
        id: Date.now(),
        text: input.value,
        timeStart: inputStartTime.value,
        timeEnd: inputEndTime.value,
        priority: inputPriority.value,
        status: STATUS.TODO,
    }

    tasks.push(task);
    saveTasks(tasks);
    renderTasks(task);

    input.value = "";
    inputStartTime.value = "";
    inputEndTime.value = "";
});

openModal.addEventListener("click", () => {
    modal.showModal();
});

closeModal.addEventListener("click", () => {
    modal.close();
});

closeTimeLogicModal.addEventListener("click", () => {
    timeLogicModal.close();
});

function createTask(task) {

    const li = document.createElement("li");
    li.classList.add("card");
    li.dataset.taskId = task.id;

    const text = document.createElement("span");
    text.textContent = `Задача: ${task.text}`;
    text.classList.add("card-text");

    const button = document.createElement("button");
    button.textContent = "X";

    button.addEventListener("click", () => {
        taskId = parseInt(task.id);
        deleteModal.showModal();
    });

    const time = document.createElement("span");
    time.classList.add("card-time");
    time.textContent = `Время выполнения ${task.timeStart} | ${task.timeEnd}`;

    const priority = document.createElement("span");
    priority.classList.add("card-priority", `priority-${task.priority}`);
    priority.textContent = `Приоритет: ${PRIORITY[task.priority]}`;

    li.append(text, time, priority, button);
    return li;
}

confirmDeleteBtn.addEventListener("click", () => {
    if (taskId === null) return;

    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
    }

    const li = document.querySelector(`[data-task-id="${taskId}"]`);
    if (li) li.remove();

    taskId = null;
    deleteModal.close();
});

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