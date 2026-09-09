import type { Task, Status } from "../types/types";
import React from "react";
import TaskCard from "./TaskCard";
import "../styles/column.css";
import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

type ColumnProps = {
  status: Status;
  
};

function Column({ status}: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: String(status) });
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <section className="column" ref={setNodeRef}>
      <h3>{status}</h3>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
    </section>
  );
}
 // todo React.memo() ???
export default React.memo(Column);
