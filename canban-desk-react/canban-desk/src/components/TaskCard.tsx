import React, { useState } from "react";
import { Input, Button } from "antd";
import type { Task } from "../types/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = {
    task: Task;
    onDragStart: (taskID: number) => void;
    onDelete: (taskID: number) => void;
    onEdit: (taskID: number, value: string) => void;
};

function TaskCard({
    task,
    onDragStart,
    onDelete,
    onEdit
}: TaskCardProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.name);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
    } = useDraggable({id:String(task.id)});

    const style = {
    transform: CSS.Translate.toString(transform),
    };

    function handleSave() {
        onEdit(task.id, value);
        setIsEditing(false);
    }

    return (
        <div
            className="task-card"
            draggable={!isEditing}
            onDragStart={() => onDragStart(task.id)}
            style={style}
        >
            <span
                ref={setNodeRef}
                {...attributes}
                {...listeners}
            >
                ☰
            </span>
            {isEditing ? (
                <>
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <Button
                        type="primary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </>
            ) : (
                <>
                    <h3>{task.name}</h3>

                    <Button
                        type="default"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
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

            <Button
                type="default"
                onClick={() => onDelete(task.id)}
            >
                Delete
            </Button>
        </div>
    );
}
// todo: useCallback for onDelete and onEdit
export default React.memo(TaskCard);