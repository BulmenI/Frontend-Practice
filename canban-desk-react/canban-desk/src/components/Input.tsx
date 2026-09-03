import { useState } from "react";
import type { Task } from "../types/types";
import '../styles/input.css';

type InputProps = {
    onAdd: (task: Task) => void;
};

function Input({ onAdd }: InputProps) {
    const [taskName, setTaskName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [priority, setPriority] = useState("low");

    function addTask() {
        const newTask: Task = {
            id: Date.now(),
            name: taskName,
            startTime,
            endTime,
            priority,
            status: "todo",
        };

        onAdd(newTask);
    }

    return (
        <div className="task-form">
            <label className="task-form-field">
                <span>Название задачи</span>

                <input
                    type="text"
                    placeholder="Название задачи"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </label>

            <label className="task-form-field">
                <span>Начальное время</span>

                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </label>

            <label className="task-form-field">
                <span>Конечное время</span>

                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </label>

            <label className="task-form-field">
                <span>Приоритет</span>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                </select>
            </label>

            <button
                type="button"
                onClick={addTask}
            >
                Добавить задачу
            </button>
        </div>
    );
}

export default Input;