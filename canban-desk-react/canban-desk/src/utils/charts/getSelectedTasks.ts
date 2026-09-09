import type { Task } from "../../types/types";
import type { EChartsOption } from "echarts";

export function getSelectedTasks(
  taskList: Task[],
  selectedStatus: string,
): EChartsOption {
  const selectedTasks = taskList.filter(
    (task) => task.status === selectedStatus,
  );

  const priorityCount = selectedTasks.reduce(
    (acc, task) => {
      if (task.priority === "high") {
        acc.high++;
      }

      if (task.priority === "medium") {
        acc.medium++;
      }

      if (task.priority === "low") {
        acc.low++;
      }

      return acc;
    },
    {
      high: 0,
      medium: 0,
      low: 0,
    },
  );

  return {
    xAxis: {
      type: "category",
      data: ["Высокий", "Средний", "Низкий"],
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        type: "bar",
        data: [
          priorityCount.high,
          priorityCount.medium,
          priorityCount.low,
        ],
      },
    ],
  };
}