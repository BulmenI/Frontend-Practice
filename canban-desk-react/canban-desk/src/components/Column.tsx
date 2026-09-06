import type { Task, Status } from "../types/types";
import React from "react";
import TaskCard from "./TaskCard";
import "../styles/column.css";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  status: Status;
  tasks: Task[];
  onDelete: (taskID: number) => void;
  onEdit: (taskID: number, name: string) => void;
};

function Column({ status, tasks, onDelete, onEdit }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: String(status) });

  return (
    <div className="column" ref={setNodeRef}>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
}

export default React.memo(Column);
