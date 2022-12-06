import type { FC } from "react";
// external
import styled from "styled-components";
import { Pie, G2, PieConfig } from "@ant-design/plots";
// styles
import { chartSection, titleWithInfoText } from "@styles";
// types
import type { IBaseChart, ILanguageCounters } from "@models/charts";
import { PieConfigFix } from "./types";
//

interface Props {
  className?: string;
  languages: [string, ILanguageCounters][];
  isMobile: boolean;
}

const LanguagesChart: FC<Props> = ({ className, languages, isMobile }) => {
  if (languages.length === 0) {
    return (
      <section className={className}>
        There is no information about the programming languages used
      </section>
    );
  }

  const G = G2.getEngine("canvas");
  const data: IBaseChart[] = languages.map(([language, counters]) => ({
    name: language,
    value: counters.frequency,
  }));

  const totalQty = data.reduce((acc, next) => acc + next.value, 0);
  const config: PieConfigFix = {
    appendPadding: 10,
    autoFit: true,
    data,
    angleField: "value",
    colorField: "name",
    radius: isMobile ? 0.5 : 0.75,
    innerRadius: isMobile ? 0.2 : 0.5,
    statistic: {
      title: isMobile
        ? false
        : {
          content: "total",
        },
      content: isMobile
        ? false
        : {
          formatter: (_, data) => data?.length.toString() ?? "",
        },
    },
    legend: {
      layout: "horizontal",
      position: "bottom",
      flipPage: false,
    },
    label: {
      type: "spider",
      labelHeight: 50,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: "circle",
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 10,
            y: 8,
            fontSize: 14,
            text: `${data.name}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: -5,
            y: 25,
            fontSize: 14,

            text: `${Math.round(data.percent * 100)}%`,
            fill: "rgba(0, 0, 0, 0.65)",
            fontWeight: 700,
          },
        });
        return group;
      },
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
      formatter: (data) => ({
        name: data.name,

        value: `${Math.round((data.value * 100) / totalQty)}% (${data.value
          } Repos)`,
      }),
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "element-highlight",
      },
    ],
  };

  return (
    <section className={className}>
      <h3>
        Languages <span>(last 100 repos)</span>
      </h3>

      <div className="chart-growing-container">
        <div className="chart">
          <Pie {...(config as PieConfig)} />
        </div>
      </div>
    </section>
  );
};

export default styled(LanguagesChart)`
  ${chartSection}

  h3 {
    ${titleWithInfoText}
  }
`;
