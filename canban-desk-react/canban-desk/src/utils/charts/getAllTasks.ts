import type { EChartsOption } from "echarts";
import type { Task } from "../../types/types";

export function getAllTasks(taskList: Task[]): EChartsOption {
  const statusColors ={
    todo:"#393a3a7a",
    inProgress:"#efef1882",
    done:"#09ec097a",
  }
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
          color:statusColors.todo,
        }}, {value:statusCount.inProgress, itemStyle:{
          color:statusColors.inProgress,
        }},{value:statusCount.done, itemStyle:{
          color:statusColors.done,
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
