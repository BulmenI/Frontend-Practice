import type { Task, Status } from "../types/types";
import { useEffect, useState, useCallback } from "react";
import { useIndexedDb } from "../hooks/customHooks";
import { Button } from "antd";
import Column from "../components/Column";
import MainModal from "../components/MainModal";
import InputValues from "../components/InputValues";
import '../styles/todo.css';
import { DndContext } from "@dnd-kit/core";

const STATUS = {
    todo: "todo",
    inProgress: "in-progress",
    done: "done",
} as const;

function Todo() {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [modalStatus, setModalStatus] = useState(false);

    const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);

    const {getAll, add, remove, get, update} = useIndexedDb<Task>();

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await getAll();
            setTaskList(tasks);
        };

        fetchTasks();
    }, []);

    function isOpen() {
        setModalStatus(prev => !prev);
    }

    async function onAdd(task: Task) {
        await add(task);
        setTaskList(prev => [...prev, task]);
        setModalStatus(false);
    }

    //todo: useCallback for onDelete and onEdit

    async function onDelete(taskId: number) {
        // todo try catch
        try{

            if ((await get(taskId))) {

            await remove(taskId);

            setTaskList(prev =>
                prev.filter(task => task.id !== taskId)
            );

        }
        }catch(error:unknown){
                if(error instanceof Error){
                    console.log(error.message)
                }

        }
        
    }

   async function onEdit(taskId: number, value: string) {

    try{
        const result = await get(taskId);

    if (!result) {
        alert("Такой задачи нет");
        return;
    }

    const editTask = taskList.find(task => task.id === taskId);

    if (!editTask) {
        alert("Такой задачи нет");
        return;
    }

    const updatedTask: Task = {...editTask, name: value,};

    await update(updatedTask);

    setTaskList(prev =>prev.map(task => task.id === taskId ? updatedTask : task));
    }catch(error:unknown){
      if(error instanceof Error){
        console.log(error.message)
        }
    }
    
}

    function onDragStart(taskId: number) {
        setDraggedTaskId(taskId);
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    async function onDrop(e: React.DragEvent<HTMLDivElement>, status: Status) {
        try{
            e.preventDefault();

        if (draggedTaskId === null) return;

        const task = taskList.find(task => task.id === draggedTaskId);

        if (!task) return;
        if (task.status === status) {
            setDraggedTaskId(null);
            return;
        }

        const updatedTask = {...task, status: status,};

        await update(updatedTask);

        setTaskList(prev => prev.map(task => task.id === draggedTaskId ? updatedTask : task));

        setDraggedTaskId(null);

        }catch(error:unknown){
          if(error instanceof Error){
            console.log(error.message)
            }
        }
        
    }

    return (
        <>
        <DndContext>
            <Button onClick={isOpen}>
                Add task
            </Button>

            <MainModal
                isOpen={modalStatus}
                onClose={() => setModalStatus(false)}
            >
                <InputValues
                    onAdd={onAdd}
                />
            </MainModal>
        <div className="todo">
            <Column
                status={STATUS.todo}
                tasks={taskList}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDelete={onDelete}
                onEdit={onEdit}
            />

            <Column
                status={STATUS.inProgress}
                tasks={taskList}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDelete={onDelete}
                onEdit={onEdit}
            />

            <Column
                status={STATUS.done}
                tasks={taskList}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </div>
        </DndContext>
        </>
    );
}

export default Todo;