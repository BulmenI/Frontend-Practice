import type { Task, Status, StatusMap } from "../types/types";
import { useEffect, useState, useRef } from "react";
import { useIndexedDb } from "../hooks/customHooks";
import { Button } from "antd";
import Column from "../components/Column";
import MainModal from "../components/MainModal";
import InputValues from "../components/InputValues";
import SearchInput from "../components/SearchInput";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addTask, setTask, updateTask } from "../store/tasksSlice";
import { ErrorBoundary } from "./ErrorBoundary";
import { Profiler } from "react";
import "../styles/todoPage.css";

import { selectedFilterTasks } from "../store/selectors";



const STATUS: StatusMap = {
  todo: "todo",
  inProgress: "inProgress",
  done: "done",
};

function Todo() {
  const taskList = useSelector(selectedFilterTasks);
  const dispatch = useDispatch<AppDispatch>();

  const [modalStatus, setModalStatus] = useState(false);

  const { getAll, add, update } = useIndexedDb<Task>();

  const profilerData = useRef<string[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAll();
        dispatch(setTask(tasks));
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchTasks();
  }, [getAll, dispatch]);

  //todo async thunk
  async function handleDragEnd(event: DragEndEvent): Promise<void> {
    const { active, over } = event;

    if (!over) return;

    const draggableId = Number(active.id);
    const status = over.id as Status;
    const task = taskList.find((task) => task.id === draggableId);

    if (!task) return;

    if (task.status === status) return;

    const updatedTask: Task = {
      ...task,
      status,
    };

    try {
      dispatch(updateTask(updatedTask));
      await update(updatedTask);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  function isOpen(): void {
    setModalStatus((prev) => !prev);
  }

  async function onAdd(task: Task): Promise<void> {
    try {
      await add(task);
      console.log("dispatch");
      dispatch(addTask(task));
      setModalStatus(false);
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  //todo: useCallback for onDelete and onEdit

  function onRender(
    id: string,
    phase: "mount" | "update" | "nested-update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ): void {
    const data = `
Component: ${id}
Phase: ${phase}
Actual duration: ${actualDuration}
Base duration: ${baseDuration}
Start time: ${startTime}
Commit time: ${commitTime}
-------------------------
`;
    profilerData.current.push(data);
  }
  function downloadProfilerData() {
    const text = profilerData.current.join("\n");

    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "profiler-data.txt";
    a.click();

    URL.revokeObjectURL(url);
  }
  return (
    <div className="todo-page">
      <h1 className="todo-page__title">Kanban-desk</h1>

      <section className="task-management">
        <h2>Управление задачами</h2>

        <div className="task-management__controls">
          <Button onClick={isOpen}>Добавить задачу</Button>

          <SearchInput />
        </div>

        <MainModal isOpen={modalStatus} onClose={() => setModalStatus(false)}>
          <InputValues onAdd={onAdd} />
        </MainModal>
      </section>

      <section className="kanban-section">
        <h2>Ваши задачи</h2>

        <ErrorBoundary>
          <DndContext onDragEnd={handleDragEnd}>
            <Profiler id="Kanban" onRender={onRender}>
              <div className="todo">
                <Column status={STATUS.todo} />
                <Column status={STATUS.inProgress} />
                <Column status={STATUS.done} />
              </div>
            </Profiler>
          </DndContext>
        </ErrorBoundary>
      </section>

      <Button className="download-button" onClick={downloadProfilerData}>
        Скачать логи
      </Button>
    </div>
  );
}

export default Todo;
