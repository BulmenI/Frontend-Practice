import React, { useState } from "react";
import { Input, Button } from "antd";
import type { Status, Task } from "../types/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { HolderOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { editTask, removeTask } from "../store/tasksSlice";
import "../styles/taskCard.css";
import dayjs from "dayjs";
import type { Priority } from "../types/types";
import MainModal from "./MainModal";
import Confirm from "./Confirm";

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.name);
  const [confirmAction, setConfirmAction] = useState<"edit" | "delete" | null>(
    null,
  );
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(task.id),
  });

  const priorityLabels: Record<Priority, string> = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
  };

  const statusLabels: Record<Status, string> = {
    todo: "Выполнить",
    "in-progress": "В процессе",
    done: "Выполнено",
  };

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  function handleSave() {
    setConfirmAction((prev) => (prev = "edit"));
  }
  async function confirmSave() {
    try {
      await dispatch(
        editTask({
          taskId: task.id,
          value,
        }),
      );
      setConfirmAction(null);
      setIsEditing(false);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
    }
  }
  function handleDelete() {
    setConfirmAction((prev) => (prev = "delete"));
  }

  async function confirmDelete() {
    try {
      await dispatch(removeTask(task.id));
      setConfirmAction(null);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  return (
    <article className="task-card" style={style} data-status={task.status}>
      <span ref={setNodeRef} {...attributes} {...listeners}>
        <HolderOutlined />
      </span>
      <MainModal
        isOpen={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
      >
        <Confirm
          confirmSave={confirmSave}
          confirmDelete={confirmDelete}
          action={confirmAction}
        />
      </MainModal>
      {isEditing ? (
        <>
          <label htmlFor="task-name">Название задачи</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />

          <Button type="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </>
      ) : (
        <>
          <h4>{task.name}</h4>

          <Button type="default" onClick={() => setIsEditing(true)}>
            Изменить
          </Button>
        </>
      )}

      <p>Начало: {dayjs(task.startTime).format("DD.MM.YYYY HH:mm")}</p>
      <p>Конец: {dayjs(task.endTime).format("DD.MM.YYYY HH:mm")}</p>

      <p>Приоритет: {task.priority ? priorityLabels[task.priority] : ""}</p>

      <p>Статус: {task.status ? statusLabels[task.status] : ""}</p>

      <Button type="default" className="delete-btn" onClick={handleDelete}>
        Удалить
      </Button>
    </article>
  );
}
// todo: useCallback for onDelete and onEdit React.memo() ???
export default React.memo(TaskCard);
