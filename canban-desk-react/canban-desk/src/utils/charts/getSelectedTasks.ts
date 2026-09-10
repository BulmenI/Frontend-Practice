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
      if (task.priority) {
        acc[task.priority]++
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
    title: {
      text: "Задачи по приоритету",
      left: "center",
    },

    tooltip: {
      trigger: "axis",
    },

    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: ["Высокий", "Средний", "Низкий"],
    },

    yAxis: {
      type: "value",
      minInterval: 1,
    },

    series: [
      {
        name: "Количество задач",
        type: "bar",

        data: [
          {
            value: priorityCount.high,
            itemStyle: {
              color: "#ff4d4f",
            },
          },
          {
            value: priorityCount.medium,
            itemStyle: {
              color: "#faad14",
            },
          },
          {
            value: priorityCount.low,
            itemStyle: {
              color: "#52c41a",
            },
          },
        ],

        barMaxWidth: 60,

        label: {
          show: true,
          position: "top",
        },
      },
    ],
  };
}
