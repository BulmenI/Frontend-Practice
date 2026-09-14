import type { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import React from "react";

type ChartProps = {
  option: EChartsOption;
};

function Chart({ option }: ChartProps) {
  return <EChartsReact option={option} style={{ height: "400px" }} />;
}
// todo React.memo() ?
export default React.memo(Chart);
