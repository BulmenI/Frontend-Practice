import type { EChartsOption } from "echarts";
import type { Task } from "../../types/types";

export function getAllTasks(taskList: Task[]): EChartsOption {
  const statusCount = taskList.reduce(
    (acc, task) => {
      if (task.status) {
        acc[task.status]++
      }
      return acc;
    },
    {
      todo: 0,
      inProgress: 0,
      done: 0,
    },
  );

  return {
    title: {
      text: "Задачи по статусам",
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
      data: ["To Do", "In Progress", "Done"],
    },

    yAxis: {
      type: "value",
      minInterval: 1,
    },

    series: [
      {
        name: "Количество задач",
        type: "bar",
        data: [{value:statusCount.todo, itemStyle:{
          color:"#1c1b19be",
        }}, {value:statusCount.inProgress, itemStyle:{
          color:"#faad14",
        }},{value:statusCount.done, itemStyle:{
          color:"#52c41a",
        }},],
        label: {
          show: true,
          position: "top",
        },
        barMaxWidth: 60,
      },
    ],
  };
}
