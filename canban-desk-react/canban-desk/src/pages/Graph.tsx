import Chart from "../components/Chart";
import { useSelector } from "react-redux";
import { getAllTasks } from "../utils/charts/getAllTasks";
import { getSelectedTasks } from "../utils/charts/getSelectedTasks";
import { selectedFilterTasks } from "../store/selectors";
import { useState } from "react";
import { Select, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { getTaskForEndDate } from "../utils/charts/getTasksforEndDate";
import dayjs from "dayjs";

function Graph() {
  const taskList = useSelector(selectedFilterTasks);
  const [selectValue, setSelectValue] = useState<string>("todo");
  const [date, setDate] = useState<Dayjs>(dayjs());

  const allOption = getAllTasks(taskList);
  const selectedOption = getSelectedTasks(taskList, selectValue);
  const endDateOption = getTaskForEndDate(taskList, date);
  //todo create antd form from third diagramm
  return (
    <>
      <Chart option={allOption} />
      <div>
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
      </div>

      <div>
        <DatePicker
          value={date}
          onChange={(value) => {
            if (value) {
              setDate(value);
            }
          }}
        />
        <Chart option={endDateOption} />
      </div>
    </>
  );
}

export default Graph;
