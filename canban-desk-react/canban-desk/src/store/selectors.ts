import type { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

export const selectedTasks = (state: RootState) => {
  return state.tasks.tasks;
};

export const selectSearch = (state: RootState) => {
  return state.tasks.search;
};
export const selectedFilterTasks = createSelector(
  [selectedTasks, selectSearch],
  (tasks, search) => {
    if (!search.trim()) {
      return tasks;
    }

    return tasks.filter((task) =>
      task.name.toLowerCase().includes(search.toLowerCase()),
    );
  },
);
