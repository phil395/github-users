import { FC } from "react";
// external
import styled from "styled-components";
// components
import Item from "./StatBlock.Item";
// other
import dataLayout from "./StatBlock.layout";
// types
import type { IStats } from "@models/stats";
//

interface Props {
  stats: IStats;
  className?: string;
}

const StatBlock: FC<Props> = ({ className, stats }) => {
  return (
    <ul className={className}>
      {dataLayout.map(({ label, icon }) => (
        <Item key={label} label={label} value={stats[label]} icon={icon} />
      ))}
    </ul>
  );
};

export default styled(StatBlock)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--grid-gap);
  list-style: none;

  @media screen and (max-width: 880px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
