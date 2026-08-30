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

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.taskId = task.id;

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

    card.append(text, time, priority, button);
    return card;
}

confirmDeleteBtn.addEventListener("click", () => {
    if (taskId === null) return;

    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
    }

    const card = document.querySelector(`[data-task-id="${taskId}"]`);
    if (card) card.remove();

    taskId = null;
    deleteModal.close();
});

function renderTasks(task) {
    const card = createTask(task);
    let targetColumn;
    if (task.status === STATUS.TODO) {
        targetColumn = document.getElementById("toDoUl");
    } else if (task.status === STATUS.IN_PROGRESS) {
        targetColumn = document.getElementById("inProgressUl");
    } else if (task.status === STATUS.DONE) {
        targetColumn = document.getElementById("doneUl");
    }
    targetColumn.append(card);
}

function dragAndDrop() {
    let currentCard;
    let offsetX;
    let offsetY;

    function onMouseMove(event) {
        currentCard.style.left = (event.clientX - offsetX) + "px";
        currentCard.style.top = (event.clientY - offsetY) + "px";
    }

    function onMouseUp(event) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        const column = event.target.closest(".column-list");
        if (column) {
            const task = tasks.find((task) => task.id === parseInt(currentCard.dataset.taskId));
            if (task) {
                task.status = column.dataset.action;
            }
            saveTasks(tasks);
            column.append(currentCard);
        }

        currentCard.style.position = "";
        currentCard.style.left = "";
        currentCard.style.top = "";
        currentCard.style.pointerEvents = "";
        currentCard = null;
    }

    main.addEventListener("mousedown", (event) => {
        event.preventDefault();
        if (event.target.closest("button")) return;

        const targetCard = event.target.closest(".card");
        if (!targetCard) return;

        const cardCoord = targetCard.getBoundingClientRect();
        offsetX = event.clientX - cardCoord.left;
        offsetY = event.clientY - cardCoord.top;

        currentCard = targetCard;
        targetCard.style.position = "absolute";
        targetCard.style.pointerEvents = "none";

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
}