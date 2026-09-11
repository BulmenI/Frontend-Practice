import type { DragEndEvent } from "@dnd-kit/core";
import type { Status, Task } from "../types/types";

export function getTaskStatusFromDrag(event: DragEndEvent, taskList: Task[]) {
  const { active, over } = event;

  if (!over) return;

  const draggableId = +active.id;
  const status = over.id as Status;
  const task = taskList.find((task) => task.id === draggableId);

  if (!task || task.status === status) return;

  return { task, status };
}
