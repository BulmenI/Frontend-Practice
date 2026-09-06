import type { Task } from "../types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useIndexedDb } from "../hooks/customHooks";

type TasksState = {
    tasks: Task[];
};

const initialState: TasksState = {
    tasks: [],
};

const {get, update} = useIndexedDb();
const tasksSlice = createSlice({
    name: "tasks",

    initialState,

    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },

        deleteTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },

        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(
                task => task.id === action.payload.id
            );

            if (index === -1) return;

            state.tasks[index] = action.payload;
        },
    },
});
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (
    { taskId, value }: { taskId: number; value: string },
    { rejectWithValue }
  ) => {
    const task = await get(taskId);

    if (!task) {
      return rejectWithValue("Такой задачи нет");
    }

    const updatedTask: Task = {
      ...(task as Task),
      name: value,
    };

    await update(updatedTask);

    return updatedTask;
  }
);

export const {
    addTask,
    deleteTask,
    updateTask
} = tasksSlice.actions;

export default tasksSlice.reducer;