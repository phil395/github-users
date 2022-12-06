// external
import { css } from "styled-components";

export const titleWithInfoText = css`
  font-size: 1rem;
  margin-bottom: var(--offset-md);

  span {
    font-size: 14px;
    font-weight: 300;
    color: #6e6e6e;
  }
`;

export const btn = css`
  padding: 10px 10px;
  border-radius: var(--radius-sm);
  font-family: inherit;
  background: var(--clr-primary);
  border: none;
  color: white;
  text-transform: uppercase;
  transition: 0.3s background-color ease;
  cursor: pointer;
  letter-spacing: 2px;
  font-size: 1rem;
  outline-offset: 1px;

  &:disabled {
    background: var(--clr-muted);
    cursor: wait;
  }

  @media screen and (max-width: 500px) {
    font-size: 13px;
  }

  &:not(:disabled):hover {
    background: var(--clr-muted);
  }
`;

export const infoText = css`
  font-size: 14px;
  color: #dddddd;
`;

export const simplePage = css`
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 50px 20px;
  }

  h1 {
    margin-bottom: 25px;
    font-size: calc(25px + 3vmin);
    text-align: center;
    color: var(--clr-dark);
  }
`;

export const blockLabel = css`
  padding: 5px var(--offset-md);
  display: inline-block;
  align-self: flex-start;
  background-color: #fff;
  border-top-left-radius: var(--radius-sm);
  border-top-right-radius: var(--radius-sm);
  letter-spacing: 2px;
  font-weight: 300;
  font-size: 1.2rem;
`;

export const blockWithLabel = css`
  padding: var(--offset-md);
  background-color: #fff;
  border-radius: var(--radius-sm);
  border-top-left-radius: 0;
  box-shadow: var(--box-shadow);
`;

export const chartSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: var(--offset-md);
  background-color: #fff;
  border-radius: var(--radius-sm);
  box-shadow: var(--box-shadow);

  .chart-growing-container {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
