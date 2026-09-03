import type { Task, Status } from "../types/types";
import { useEffect, useState } from "react";
import { useIndexedDb } from "../hooks/customHooks";
import Column from "../components/Column";
import Modal from "../components/Modal";
import Input from "../components/Input";


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
            setTaskList(tasks.result);
        };

        fetchTasks();
    }, []);

    function isOpen() {
        setModalStatus(prev => !prev);
    }

    async function onDelete(taskId: number) {
        if ((await get(taskId)).result) {

            await remove(taskId);

            setTaskList(prev =>
                prev.filter(task => task.id !== taskId)
            );

        } else {
            alert("Такой задачи нет");
        }
    }

   async function onEdit(taskId: number, value: string) {
    const result = await get(taskId);

    if (!result.result) {
        alert("Такой задачи нет");
        return;
    }

    const editTask = taskList.find(
        task => task.id === taskId
    );

    if (!editTask) {
        alert("Такой задачи нет");
        return;
    }

    const updatedTask: Task = {
        ...editTask,
        name: value,
    };

    await update(updatedTask);

    setTaskList(prev =>
        prev.map(task =>
            task.id === taskId ? updatedTask : task
        )
    );
}

    function onDragStart(taskId: number) {
        setDraggedTaskId(taskId);
    }

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    async function onDrop(e: React.DragEvent<HTMLDivElement>,status: Status) {
        e.preventDefault();

        if (draggedTaskId === null) return;

        const task = taskList.find(
            task => task.id === draggedTaskId
        );

        if (!task) return;
        if (task.status === status) {
            setDraggedTaskId(null);
            return;
        }

        const updatedTask = {
            ...task,
            status: status,
        };

        await update(updatedTask);

        setTaskList(prev =>
            prev.map(task =>
                task.id === draggedTaskId
                    ? updatedTask
                    : task
            )
        );

        setDraggedTaskId(null);
    }

    return (
        <div className="todo">

            <button onClick={isOpen}>
                Add task
            </button>

            <Modal
                isOpen={modalStatus}
                onClose={() => setModalStatus(false)}
            >
                <Input
                    onAdd={add}
                />
            </Modal>

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
    );
}

export default Todo;