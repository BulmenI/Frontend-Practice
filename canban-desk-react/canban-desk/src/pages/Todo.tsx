import type { Task } from "../types/types";
import { useState } from "react";
import { useProfiler } from "../hooks/customHooks";
import { Button } from "antd";
import MainModal from "../components/MainModal";
import InputValues from "../components/InputValues";
import SearchInput from "../components/SearchInput";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addTaskAsync } from "../store/tasksSlice";

import "../styles/todoPage.css";

import CanbanDesk from "../components/CanbanDesk";

function Todo() {
  const dispatch = useDispatch<AppDispatch>();

  const [modalStatus, setModalStatus] = useState(false);

  const { onRender, downloadProfilerData } = useProfiler();

  function isOpen(): void {
    setModalStatus((prev) => !prev);
  }

  async function onAdd(task: Task): Promise<void> {
    try {
      await dispatch(addTaskAsync(task));
      setModalStatus(false);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  //todo: useCallback for onDelete and onEdit

  return (
    <div className="todo-page">
      <h1 className="todo-page-title">Kanban-desk</h1>

      <section className="task-management">
        <h2>Управление задачами</h2>

        <div className="task-management-controls">
          <Button onClick={isOpen}>Добавить задачу</Button>

          <SearchInput />
        </div>

        <MainModal isOpen={modalStatus} onClose={() => setModalStatus(false)}>
          <InputValues onAdd={onAdd} />
        </MainModal>
      </section>

      <CanbanDesk onRender={onRender} />

      <Button className="download-button" onClick={downloadProfilerData}>
        Скачать логи
      </Button>
    </div>
  );
}

export default Todo;
