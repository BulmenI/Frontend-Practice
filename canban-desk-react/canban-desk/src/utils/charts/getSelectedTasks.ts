import type { Task } from "../../types/types";
import type { EChartsOption } from "echarts";

export function getSelectedTasks(taskList: Task[], selectedStatus: string): EChartsOption {
  const count = taskList.filter(
    (task) => task.status === selectedStatus,
  ).length;
  return {
    xAxis: {
      type: "category",
      data: [selectedStatus],
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        type: "bar",
        data: [count],
      },
    ],
  };
}
