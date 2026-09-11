import { ErrorBoundary } from "../pages/ErrorBoundary";
import { Profiler, type ProfilerOnRenderCallback } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";
import { getTaskStatusFromDrag } from "../utils/dragAndDrop";
import { useDispatch, useSelector } from "react-redux";
import { selectedFilterTasks } from "../store/selectors";
import type { AppDispatch } from "../store/store";
import { moveTask } from "../store/tasksSlice";
import type { StatusMap } from "../types/types";
import "../styles/canbanDesk.css";

const STATUS: StatusMap = {
  todo: "todo",
  inProgress: "inProgress",
  done: "done",
};
type CanbanDeskProps = {
  onRender: ProfilerOnRenderCallback;
};
function CanbanDesk({ onRender }: CanbanDeskProps) {
  const taskList = useSelector(selectedFilterTasks);
  const dispatch = useDispatch<AppDispatch>();

  function handleDragEnd(event: DragEndEvent) {
    const result = getTaskStatusFromDrag(event, taskList);
    if (!result) return;
    dispatch(moveTask(result));
  }

  return (
    <section className="kanban-section">
      <h2>Ваши задачи</h2>
      <ErrorBoundary>
        <DndContext onDragEnd={handleDragEnd}>
          <Profiler id="Kanban" onRender={onRender}>
            <div className="todo">
              <Column status={STATUS.todo}></Column>
              <Column status={STATUS.inProgress}></Column>
              <Column status={STATUS.done}></Column>
            </div>
          </Profiler>
        </DndContext>
      </ErrorBoundary>
    </section>
  );
}

export default CanbanDesk;
