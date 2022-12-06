import { FC, useState } from "react";
// external
import styled from "styled-components";
import { Heatmap, HeatmapConfig } from "@ant-design/plots";
// components
import { Spinner, Toggler } from "@components";
// hooks
import { useAppSelector } from "@hooks";
// styles
import { chartSection, graphColors } from "@styles";
// types
import type { IHeatmapChart } from "@models/charts";
import type { HeatmapConfigFix } from "./types";
//

interface Props {
  className?: string;
}

const HeatmapChart: FC<Props> = ({ className }) => {
  const data = useAppSelector(
    (state) => state.parser.data?.contributions?.counters?.byMonths
  );
  const status = useAppSelector((state) => state.parser.status);

  const [type, setType] =
    useState<Exclude<keyof IHeatmapChart, "value">>("year");

  if (status === "initial" || status === "pending") {
    return (
      <section className={className} style={{ minHeight: "200px" }}>
        <Spinner size={100} center />
      </section>
    );
  }

  if (status === "error") {
    return <section className={className}>Data not found</section>;
  }

  if (!data) return null;

  const config: HeatmapConfigFix = {
    data,
    xField: type,
    yField: type === "year" ? "month" : "year",
    colorField: "value",
    legend: true,
    color: `${graphColors.zeroLevel}-${graphColors.firstLevel}-${graphColors.secondLevel}-${graphColors.thirdLevel}-${graphColors.fourthLevel}`,
    coordinate: {
      type: "polar",
      cfg: {
        innerRadius: 0.2,
      },
    },
    heatmapStyle: {
      stroke: "#f5f5f5",
      opacity: 0.8,
    },
    meta: {
      time: {
        type: "cat",
      },
    },
    xAxis: {
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 12,
        style: {
          fill: "#5f5f5f",
          fontSize: 12,
          textBaseline: "top",
        },
      },
    },
    yAxis: {
      top: true,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 0,
        style: {
          fill: "#383838",
          textAlign: "center",
          shadowBlur: 2,
          shadowColor: "rgba(0, 0, 0, .45)",
        },
      },
    },
    tooltip: {
      formatter: (data) => ({
        name: type === "year" ? data.month : `${data.year}, ${data.month}`,
        value: `${data.value} contributions`,
      }),
      domStyles: {
        "g2-tooltip-value": {
          fontWeight: 700,
        },
      },
      showMarkers: false,
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <section className={className}>
      <h3>All contributions</h3>

      <Toggler
        name="heatmap-sort-type"
        title="Sort by"
        options={[
          {
            id: "sort-by-month",
            label: "Month",
            value: "month",
          },
          {
            id: "sort-by-year",
            label: "Year",
            value: "year",
            defaultChecked: true,
          },
        ]}
        onChange={(e) => setType(e.target.value)}
      />

      <div className="chart-growing-container">
        <div className="chart">
          <Heatmap {...(config as HeatmapConfig)} />
        </div>
      </div>
    </section>
  );
};

export default styled(HeatmapChart)`
  ${chartSection}
  position: relative;

  h3 {
    font-size: 1rem;
    margin-bottom: var(--offset-md);
  }

  ${Toggler} {
    align-self: flex-end;
  }
`;
