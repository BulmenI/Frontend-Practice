import type { Task, Status } from "../types/types";
import React from "react";
import TaskCard from "./TaskCard";
import "../styles/column.css";
import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

type ColumnProps = {
  status: Status;
  onDelete: (taskID: number) => void;
  onEdit: (taskID: number, name: string) => void;
};

function Column({ status, onDelete, onEdit }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: String(status) });
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

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
