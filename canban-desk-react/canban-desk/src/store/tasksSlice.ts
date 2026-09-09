import type { Task } from "../types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTask,
  updateTask as updateTaskDb,
  deleteTask as deleteTaskDb,
} from "../hooks/customHooks";

type TasksState = {
  tasks: Task[];
  search: string;
};

const initialState: TasksState = {
  tasks: [],
  search: "",
};

export const removeTask = createAsyncThunk(
  "tasks/removeTask",

  async (taskId: number, { rejectWithValue }) => {
    try {
      await deleteTaskDb(taskId);
      return taskId;
    } catch {
      return rejectWithValue("Не удалось удалить задачу");
    }
  },
);
export const editTask = createAsyncThunk<
  Task,
  { taskId: number; value: string },
  { rejectValue: string }
>(
  "tasks/editTask",
  async (
    { taskId, value }: { taskId: number; value: string },
    { rejectWithValue },
  ) => {
    try {
      const task = await getTask(taskId);
      if (!task) {
        return rejectWithValue("Такой задачи нет");
      }
      const updatedTask = {
        ...task,
        name: value,
      };
      await updateTaskDb(updatedTask);
      return updatedTask;
    } catch {
      return rejectWithValue("Не удалось изменить задачу");
    }
  },
);
const tasksSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },

    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (index === -1) return;

      state.tasks[index] = action.payload;
    },
    setTask(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    moveTask(
      state,
      action: PayloadAction<{
        taskId: number;
        status: Task["status"];
      }>,
    ) {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId,
      );

      if (!task) return;

      task.status = action.payload.status;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );

        if (index === -1) return;

        state.tasks[index] = action.payload;
      });
  },
});

export const { addTask, updateTask, moveTask, setTask, setSearch } =
  tasksSlice.actions;

export default tasksSlice.reducer;
