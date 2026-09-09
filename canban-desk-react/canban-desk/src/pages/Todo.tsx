import type { Task, Status } from "../types/types";
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

const STATUS = {
  todo: "todo",
  inProgress: "in-progress",
  done: "done",
} as const;

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
      await update(updatedTask);
      dispatch(updateTask(updatedTask));
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
    //todo delete url 

    URL.revokeObjectURL(url);
  }
  return (
    <div className="todo-page">
      <h1>Kanban-desk</h1>

      <section>
        <h2>Управление задачами</h2>

        <Button onClick={isOpen} block>
          Добавить задачу
        </Button>

        <MainModal isOpen={modalStatus} onClose={() => setModalStatus(false)}>
          <InputValues onAdd={onAdd} />
        </MainModal>

        <SearchInput />
      </section>

      <section>
        <h2>Канбан-доска</h2>

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

      <Button onClick={downloadProfilerData} block>
        Скачать логи
      </Button>
    </div>
  );
}

export default Todo;
