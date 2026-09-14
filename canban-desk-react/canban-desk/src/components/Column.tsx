import type { Status } from "../types/types";
import React from "react";
import TaskCard from "./TaskCard";
import "../styles/column.css";
import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { selectedTasks, selectSearch } from "../store/selectors";

type ColumnProps = {
  status: Status;
};

function Column({ status }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: String(status) });

  const tasks = useSelector(selectedTasks);
  const search = useSelector(selectSearch);

  const normalizedSearch = search.trim().toLowerCase();

  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <section className="column" ref={setNodeRef}>
      <h3>{status.toUpperCase()}</h3>
      {columnTasks.map((task) => {
        const isMatched =
          normalizedSearch !== "" &&
          task.name.toLowerCase().includes(normalizedSearch);

        return <TaskCard key={task.id} task={task} isMatched={isMatched} />;
      })}
    </section>
  );
}
// todo React.memo() ???
export default React.memo(Column);
