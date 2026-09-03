import { useState } from "react";
import type { Task } from "../types/types";

type TaskCardProps = {
    task: Task;
    onDragStart?: (taskID: number) => void;
    onDelete?: (taskID: number) => void;
    onEdit?: (taskID: number, value: string) => void;
};

function TaskCard({
    task,
    onDragStart,
    onDelete,
    onEdit
}: TaskCardProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.name);

    function handleSave() {
        onEdit?.(task.id, value);
        setIsEditing(false);
    }

    return (
        <div
            className="task-card"
            draggable={!isEditing}
            onDragStart={() => onDragStart?.(task.id)}
        >
            {isEditing ? (
                <>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <h3>{task.name}</h3>

                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                </>
            )}

            <p>Start: {task.startTime}</p>
            <p>End: {task.endTime}</p>

            {task.priority && (
                <p>Priority: {task.priority}</p>
            )}

            {task.status && (
                <p>Status: {task.status}</p>
            )}

            <button
                type="button"
                onClick={() => onDelete?.(task.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default TaskCard;