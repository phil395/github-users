import { useState, useRef, FC, ChangeEvent } from "react";
// external
import styled from "styled-components";
import { Bar, BarConfig } from "@ant-design/plots";
// components
import { Toggler } from "@components";
// styles
import { chartSection, titleWithInfoText } from "@styles";
// types
import type { IRepo, ISortedRepos } from "@models/repos";
import type { ReposSortType } from "@models/charts";
import type { BarConfigFix } from "./types";
import type { IRadioOption } from "src/components/Toggler";
//

interface Props {
  sortedList: ISortedRepos;
  className?: string;
}

const radioBtns: IRadioOption[] = [
  {
    id: "sort-by-stars",
    label: "Stars",
    value: "stars",
    defaultChecked: true,
  },
  {
    id: "sort-by-watchers",
    label: "Watchers",
    value: "watchers",
  },
  {
    id: "sort-by-forks",
    label: "Forks",
    value: "forks",
  },
];

const sortMap: Record<ReposSortType, keyof ISortedRepos> = {
  stars: "byStars",
  forks: "byForks",
  watchers: "byWatchers",
};

const ReposChart: FC<Props> = ({ className, sortedList }) => {
  const [type, setType] = useState<ReposSortType>("stars");
  const chartRef = useRef(null);

  if (sortedList.byStars.length === 0) {
    return (
      <section className={className}>
        There is no information about repos
      </section>
    );
  }

  const config: BarConfigFix = {
    autoFit: true,
    data: sortedList[sortMap[type]],
    xField: type,
    yField: "name",
    seriesField: "name",
    isStack: true,
    legend: false,
    barStyle: {
      radius: [6, 6, 0, 0],
      cursor: "pointer",
    },
    label: {
      position: "right",
      offset: 5,
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
      fields: ["stars", "watchers", "forks"],
    },
  };

  const handler = (e: ChangeEvent<HTMLFormElement>) => {
    setType(e.target.value);
  };
  return (
    <section className={className}>
      <h3>
        Top repos <span>(last 100 repos)</span>
      </h3>

      <Toggler
        name="repos-sort-type"
        title="Sorted by"
        onChange={handler}
        options={radioBtns}
      />

      <div className="chart-growing-container">
        <div className="chart">
          <Bar
            ref={chartRef}
            {...(config as BarConfig)}
            onReady={(plot) => {
              plot.on(
                "element:click",
                ({ data: { data } }: { data: { data: IRepo; }; }) => {
                  window.open(data.url);
                  console.log(data);
                }
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default styled(ReposChart)`
  ${chartSection}

  h3 {
    ${titleWithInfoText}
  }

  ${Toggler} {
    margin-bottom: 15px;
    align-self: flex-end;

    @media screen and (max-width: 400px) {
      &::before {
        display: none;
      }
    }
  }
`;
