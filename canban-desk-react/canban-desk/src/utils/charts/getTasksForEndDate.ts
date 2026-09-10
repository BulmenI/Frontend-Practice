import type { EChartsOption } from "echarts";
import type { Status, Task } from "../../types/types";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export function getTaskForEndDate(
  taskList: Task[],
  endTime: Dayjs,
  status: Status | "all",
): EChartsOption {
  const endedTasks = taskList
    .filter((task) => dayjs(task.endTime).isSame(endTime, "day"))
    .filter((task) => {
      return status === "all" || task.status === status;
    });

  const priorityCount = endedTasks.reduce(
    (acc, task) => {
      if (task.priority) {
        acc[task.priority]++;
      }

      return acc;
    },
    {
      high: 0,
      medium: 0,
      low: 0,
    },
  );

  const hasTasks = endedTasks.length > 0;

  return {
    title: {
      show: !hasTasks,
      text: "Нет задач за выбранную дату",
      left: "center",
      top: "middle",
    },

    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },

    legend: {
      show: hasTasks,
      bottom: 0,
      data: ["Высокий", "Средний", "Низкий"],
    },

    graphic: hasTasks
      ? {
          type: "text",
          left: "center",
          top: "center",
          style: {
            align: "center",
            fontSize: 18,
            fontWeight: "bold",
          },
        }
      : undefined,

    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],

        label: {
          show: hasTasks,
          formatter: "{b}: {d}%",
        },

        itemStyle: {
          borderRadius: 6,
          borderColor: "#fff",
          borderWidth: 2,
        },

        data: hasTasks
          ? [
              {
                value: priorityCount.high,
                name: "Высокий",
                itemStyle: {
                  color: "#ff4d4f",
                },
              },
              {
                value: priorityCount.medium,
                name: "Средний",
                itemStyle: {
                  color: "#faad14",
                },
              },
              {
                value: priorityCount.low,
                name: "Низкий",
                itemStyle: {
                  color: "#52c41a",
                },
              },
            ]
          : [
              {
                value: 1,
                name: "Нет задач",
                itemStyle: {
                  color: "#e5e5e5",
                },
              },
            ],
      },
    ],
  };
}