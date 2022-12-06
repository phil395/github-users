import { FC } from "react";
// external
import styled from "styled-components";
import CountUp from "react-countup";
// types
import type { IStatBlock } from "./StatBlock.layout";
//

const Item: FC<IStatBlock> = ({ label, value, icon }) => {
  const { svg, ...colors } = icon;

  return (
    <Root>
      <Icon {...colors}>{svg}</Icon>
      <div className="texts">
        <div>
          <CountUp end={value || 0} duration={3} />
        </div>
        <div>{label}</div>
      </div>
    </Root>
  );
};

const Root = styled.li`
  display: flex;
  align-items: center;
  padding: var(--offset-md);
  border-radius: var(--radius-sm);
  background-color: #fff;
  box-shadow: var(--box-shadow);

  .texts {
    margin-left: var(--offset-md);

    div:first-child {
      font-weight: 700;
      font-size: 1.5rem;
    }
    div:last-child {
      text-transform: capitalize;
      font-weight: 300;
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 500px) {
    padding: 10px;

    .texts {
      margin-left: 10px;
      div:first-child {
        font-size: 16px;
      }
      div:last-child {
        font-size: 14px;
      }
    }
  }
`;

interface IconProps {
  bgColor: string;
  color: string;
}

const Icon = styled.div<IconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: 1.5rem;

  @media screen and (max-width: 500px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

export default Item;
