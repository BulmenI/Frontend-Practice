import React, { useState } from "react";
import { Input, Button } from "antd";
import type { Task } from "../types/types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { HolderOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { editTask, removeTask } from "../store/tasksSlice";
import "../styles/taskCard.css";
import dayjs from "dayjs";
import type { Priority } from "../types/types";

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.name);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(task.id),
  });

  const priorityLabels: Record<Priority, string> = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
  };

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  function handleSave() {
    dispatch(
      editTask({
        taskId: task.id,
        value,
      }),
    );
    setIsEditing(false);
  }
  function handleDelete() {
    dispatch(removeTask(task.id));
  }

  return (
    <article className="task-card" style={style} data-status={task.status}>
      <span ref={setNodeRef} {...attributes} {...listeners}>
        <HolderOutlined />
      </span>
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

      <p>
        Приоритет: {task.priority ? priorityLabels[task.priority] : ""}
      </p>

      <p>Статус: {task.status}</p>

      <Button type="default" className="delete-btn" onClick={handleDelete}>
        Удалить
      </Button>
    </article>
  );
}
// todo: useCallback for onDelete and onEdit React.memo() ???
export default React.memo(TaskCard);
