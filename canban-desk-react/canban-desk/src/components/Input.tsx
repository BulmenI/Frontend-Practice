import { useState } from "react";
import type { Task } from "../types/types";

type InputProps = {
    onAdd:(task:Task) => void
}

function Input({ onAdd }: InputProps){

    const [taskName, setTaskName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [priority, setPriority] = useState('low');
   
    
    function addTask() {
        
        const newTask:Task = {
            id:Date.now(),
            name:taskName,
            startTime:startTime,
            endTime:endTime,
            priority:priority,
        };
        
        onAdd(newTask);

    }
    
    return (
        <>
        <p>Введите название задачи</p>
        <input 
        type="text"
        placeholder="Название задачи"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
          />
        <p>Введите начальное время</p>
        <input 
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
         />
        <p>Введите конечное время</p>
        <input 
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
         />
        <p>Выберите приоритет </p>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
        </select>
        <button type="button" onClick={addTask}>Добавить задачу</button>
        </>
    );
}

export default Input;