import { ChangeEvent, FC, SVGProps, useRef, useState } from "react";
// external
import styled from "styled-components";
// components
import { Spinner, Toggler, Tooltip } from "@components";
// hooks
import { useAppSelector } from "@hooks";
// others
import { formatDate } from "@utils";
import {
  calculateTotal,
  findIndexOfDay,
  getBottomOffsetOfDay,
  getGraphHeight,
  getGraphWidth,
  getLeftOffsetOfWeekGroup,
  getMonthsNameRenderMap,
  GraphSizes,
} from "./Graph.helpers";
// styles
import { graphColors } from "@styles";
// types
import type { DailyContributions } from "@models/contributions";
import type { ITooltipCommands } from "src/components/Tooltip/Tooltip";
//

interface Props {
  className?: string;
  isMobile: boolean;
}

const Graph: FC<Props> = ({ className, isMobile }) => {
  const contributions = useAppSelector(
    (state) => state.parser.data?.contributions.list
  );
  const status = useAppSelector((state) => state.parser.status);
  const [year, setYear] = useState<number>();
  const tooltip = useRef<ITooltipCommands>(null);

  if (status === "initial" || status === "pending") {
    return (
      <section className={className}>
        <Spinner size={100} />
      </section>
    );
  }

  if (status === "error") {
    return <section className={className}>Data not found</section>;
  }

  if (!contributions) return null;

  const sizes: GraphSizes = {
    cell: isMobile ? 14 : 17,
    gap: isMobile ? 4 : 5,
    borderR: 3,
    textRowHeight: 25,
  };

  const yearHandler = (e: ChangeEvent<HTMLFormElement>) => {
    setYear(parseInt(e.target.value));
  };

  const selectedList = year
    ? contributions.byYears.find((item) => item.year === year)?.data ?? []
    : contributions.last;

  return (
    <section className={className}>
      <h3>
        {`${calculateTotal(selectedList)} contributions in ${year ? year : "the last year"
          }`}
      </h3>

      <div className="container">
        <div className="graph">
          <svg
            width={getGraphWidth(sizes, selectedList.length)}
            height={getGraphHeight(sizes)}
          >
            {selectedList.map((weekData, weekIndex) => (
              <g
                key={weekIndex}
                style={{
                  transform: `translate(${getLeftOffsetOfWeekGroup(
                    sizes,
                    weekIndex
                  )}px, ${sizes.textRowHeight}px)`,
                }}
              >
                {weekData.map((dayData, dayIndex, array) => {
                  const attrs: SVGProps<SVGRectElement> = {
                    key: dayIndex,
                    width: sizes.cell,
                    height: sizes.cell,
                    x: 0,
                    y: getBottomOffsetOfDay(
                      sizes,
                      findIndexOfDay({
                        indexInArray: dayIndex,
                        arrayLength: array.length,
                        date: dayData.date,
                      })
                    ),
                    rx: sizes.borderR,
                    ry: sizes.borderR,
                    className: `level-${dayData.colorLevel}`,
                  };
                  return (
                    <rect
                      key={dayIndex}
                      {...attrs}
                      onMouseEnter={(e) =>
                        tooltip.current?.show(e, ".graph", dayData)
                      }
                      onMouseLeave={() => tooltip.current?.hide()}
                    ></rect>
                  );
                })}
              </g>
            ))}

            {getMonthsNameRenderMap(sizes, selectedList).map(
              (month, index, arr) => {
                // remove the first month if the distance from it to the second month is less than 30 pixels
                if (index === 0 && arr[index + 1].offset < 30) return;
                return (
                  <text
                    key={index}
                    className="month-name"
                    x={month.offset}
                    y={16}
                  >
                    {month.month}
                  </text>
                );
              }
            )}
          </svg>

          <Tooltip ref={tooltip}>
            {(dayData: DailyContributions) => (
              <>
                <div className={`level-${dayData.colorLevel}`}></div>
                <div className="counter">{dayData.counter} contributions</div>
                <div className="date">
                  &nbsp;on&nbsp;{formatDate(dayData.date)}
                </div>
              </>
            )}
          </Tooltip>
        </div>

        <div className="toggler-wrapper">
          <Toggler
            name="years"
            options={contributions.byYears.map(({ year }) => ({
              id: `${year}`,
              label: year,
              value: year,
            }))}
            onChange={yearHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default styled(Graph)`
  --level-0: ${graphColors.zeroLevel};
  --level-1: ${graphColors.firstLevel};
  --level-2: ${graphColors.secondLevel};
  --level-3: ${graphColors.thirdLevel};
  --level-4: ${graphColors.fourthLevel};

  background-color: #fff;
  padding: var(--offset-md);
  text-align: center;

  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow);
  border-radius: var(--radius-sm);

  h3 {
    font-size: 1rem;
    margin-bottom: var(--offset-md);
    text-align: center;
  }

  .container {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .graph {
    position: relative;

    svg {
      display: block;
      margin: 0 auto;
    }
  }

  ${Tooltip} {
    display: flex;

    align-items: center;

    @media screen and (max-width: 500px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > *:not(:last-child) {
        margin-bottom: 5px;
        width: 120px;
        text-align: center;
      }
    }

    .level-0 {
      background-color: var(--level-0);
    }
    .level-1 {
      background-color: var(--level-1);
    }
    .level-2 {
      background-color: var(--level-2);
    }
    .level-3 {
      background-color: var(--level-3);
    }
    .level-4 {
      background-color: var(--level-4);
    }
    [class^="level"] {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .counter {
      font-weight: 700;
    }
  }

  .toggler-wrapper {
    text-align: center;
  }

  ${Toggler} {
    margin: 5px 0;
  }

  ${Spinner} {
    margin: 0 auto;
    display: block;
  }

  rect.level-0 {
    fill: var(--level-0);
  }

  rect.level-1 {
    fill: var(--level-1);
  }

  rect.level-2 {
    fill: var(--level-2);
  }

  rect.level-3 {
    fill: var(--level-3);
  }

  rect.level-4 {
    fill: var(--level-4);
  }

  rect[class*="level"] {
    stroke: #969696;
    stroke-width: 0.3px;
    shape-rendering: geometricPrecision;
  }

  text[month-name] {
    font-size: 16px;
  }
`;
