import type { EChartsOption } from "echarts";
import type { Status, Task } from "../../types/types";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export function getTaskForEndDate(
  taskList: Task[],
  endTime: Dayjs,
  status: Status | null,
): EChartsOption {
  const endedTasks = taskList
    .filter((task) => dayjs(task.endTime).isSame(endTime, "day"))
    .filter((task) => {
      return status === null || task.status === status;
    });

  const priorityCount = endedTasks.reduce(
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
    series: [
      {
        type: "pie",
        data: [
          {
            value: priorityCount.high,
            name: "Высокий",
          },
          {
            value: priorityCount.medium,
            name: "Средний",
          },
          {
            value: priorityCount.low,
            name: "Низкий",
          },
        ],
      },
    ],
  };
}
