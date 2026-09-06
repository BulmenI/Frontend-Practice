import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
    reducer:{
        tasks:tasksReducer,
    },
    extraReducers: builder => {
    builder.addCase(editTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id
      );

      if (index === -1) return;

      state.tasks[index] = action.payload;
    });
  },
});

export type RootState =
    ReturnType<typeof store.getState>;

export type AppDispatch =
    typeof store.dispatch;