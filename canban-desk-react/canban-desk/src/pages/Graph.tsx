import Chart from "../components/Chart";
import { useSelector } from "react-redux";
import { getAllTasks } from "../utils/charts/getAllTasks";
import { selectedFilterTasks } from "../store/selectors";
import { useState } from "react";
import { Select } from "antd";

function Graph() {
  const taskList = useSelector(selectedFilterTasks);
  const [selectValue, setSelectValue] = useState();

  const allOption = getAllTasks(taskList);

  return (
    <>
      <Select
        value={selectValue}
        onChange={setSelectValue}
        options={[
          { value: "todo", label: "To Do" },
          { value: "in-progress", label: "In Progress" },
          { value: "done", label: "Done" },
        ]}
      />
      <Chart option={allOption} />
    </>
  );
}

export default Graph;
