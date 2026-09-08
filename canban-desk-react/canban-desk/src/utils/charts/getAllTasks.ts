import type { EChartsOption } from "echarts";
import type { Task } from "../../types/types";

export function getAllTasks(taskList: Task[]): EChartsOption {
  const toDoCount = taskList.filter((task) => task.status === "todo").length;

  const inProgressCount = taskList.filter(
    (task) => task.status === "in-progress",
  ).length;

  const doneCount = taskList.filter((task) => task.status === "done").length;

  return {
    xAxis: {
      type: "category",
      data: ["To Do", "In Progress", "Done"],
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        type: "line",
        data: [toDoCount, inProgressCount, doneCount],
      },
    ],
  };
}
