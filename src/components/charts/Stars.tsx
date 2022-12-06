import { FC } from "react";
// external
import styled from "styled-components";
import { Pie, PieConfig } from "@ant-design/plots";
// styles
import { chartSection, titleWithInfoText } from "@styles";
// types
import type { IBaseChart, ILanguageCounters } from "@models/charts";
import { PieConfigFix } from "./types";
//

interface Props {
  languages: [string, ILanguageCounters][];
  isMobile: boolean;
  className?: string;
}

const StarsChart: FC<Props> = ({ className, languages, isMobile }) => {
  if (languages.length === 0) {
    return (
      <section className={className}>
        There is no information about the programming languages used
      </section>
    );
  }

  const data: IBaseChart[] = languages.map(([language, counters]) => ({
    name: language,
    value: counters.stars,
  }));

  const config: PieConfigFix = {
    appendPadding: 10,
    data,
    autoFit: true,
    angleField: "value",
    colorField: "name",
    radius: 1,
    innerRadius: isMobile ? 0.3 : 0.6,
    meta: {
      value: {
        formatter: (v) => `&#9734; ${v}`,
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
      autoRotate: true,
      formatter: (a) => {
        const percent = Math.round(a.percent * 100);
        return percent > 4 ? `${percent}%` : "";
      },
    },
    legend: {
      layout: isMobile ? "horizontal" : "vertical",
      position: isMobile ? "bottom" : "right",
      maxRow: 4,
      flipPage: false,
    },
    tooltip: {
      domStyles: {
        "g2-tooltip-value": {
          fontSize: "16px",
        },
        "g2-tooltip-name": {
          fontWeight: 700,
          fontSize: "14px",
        },
      },
    },
    statistic: {
      content: isMobile ? false : {},
      title: isMobile ? false : {},
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
      {
        type: "tooltip",
        enable: true,
      },
    ],
  };

  return (
    <section className={className}>
      <h3>
        Stars <span>(last 100 repos)</span>
      </h3>

      <div className="chart-growing-container">
        <div className="chart">
          <Pie {...(config as PieConfig)} />
        </div>
      </div>
    </section>
  );
};

export default styled(StarsChart)`
  ${chartSection}

  text-align: center;

  h3 {
    ${titleWithInfoText}
  }
`;
