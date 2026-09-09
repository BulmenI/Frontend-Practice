import Chart from "../components/Chart";
import { useSelector } from "react-redux";
import { getAllTasks } from "../utils/charts/getAllTasks";
import { getSelectedTasks } from "../utils/charts/getSelectedTasks";
import { selectedFilterTasks } from "../store/selectors";
import { useState } from "react";
import { Select, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { getTaskForEndDate } from "../utils/charts/getTasksForEndDate";
import dayjs from "dayjs";
import type { Status } from "../types/types";

function Graph() {
  const taskList = useSelector(selectedFilterTasks);
  const [selectValue, setSelectValue] = useState<Status>("todo");
  const [selectSecondValue, setSelectSecondValue] = useState<Status | null>(
    null,
  );
  const [date, setDate] = useState<Dayjs>(dayjs());
  // todo useMemo?
  const allOption = getAllTasks(taskList);
  const selectedOption = getSelectedTasks(taskList, selectValue);
  const endDateOption = getTaskForEndDate(taskList, date, selectSecondValue);
  //todo add more logic for third diagramm
  return (
    <>
      <h1>Статистика задач</h1>
      <section>
        <h2>Общая статистика</h2>
        <Chart option={allOption} />
      </section>

      <section>
        <h2>Статистика по статусу</h2>
        <label htmlFor="status">Статус задачи</label>
        <Select
          value={selectValue}
          onChange={setSelectValue}
          options={[
            { value: "todo", label: "To Do" },
            { value: "in-progress", label: "In Progress" },
            { value: "done", label: "Done" },
          ]}
        />
        <Chart option={selectedOption} />
      </section>

      <section>
        <h2>Статистика по дате</h2>
        <DatePicker
          value={date}
          onChange={(value) => {
            if (value) {
              setDate(value);
            }
          }}
        />
        <Select
          value={selectSecondValue}
          onChange={setSelectSecondValue}
          options={[
            { value: null, label: "All status" },
            { value: "todo", label: "To Do" },
            { value: "in-progress", label: "In Progress" },
            { value: "done", label: "Done" },
          ]}
        />

        <Chart option={endDateOption} />
      </section>
    </>
  );
}

export default Graph;
