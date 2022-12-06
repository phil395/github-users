import { FC } from "react";
// external
import styled, { css, keyframes } from "styled-components";
//

type Props = {
  className?: string;
};

const Spinner: FC<Props> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 16 16"
    fill="none"
  >
    <circle cx="8" cy="8" r="7" stroke="currentColor"></circle>
    <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor"></path>
  </svg>
);

const rotate = keyframes`
	100% {
    transform: rotate(360deg);
  }
`;

type SCProps = {
  size?: number;
  center?: boolean;
};

export default styled(Spinner) <SCProps>`
  --size: ${(props) => props.size ?? 30}px;
  animation: ${rotate} 2s linear infinite;

  width: var(--size);
  height: var(--size);

  ${(props) =>
    props.center
      ? css`
          position: absolute;
          z-index: 2;
          top: calc(50% - var(--size) / 2);
          left: calc(50% - var(--size) / 2);
        `
      : null}

  circle {
    stroke: #c2c1c1;
    stroke-opacity: 0.2;
  }

  path {
    stroke: #929292;
    stroke-linecap: round;
  }

  circle,
  path {
    stroke-width: 2px;
  }
`;
