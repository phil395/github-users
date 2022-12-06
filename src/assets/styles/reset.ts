// external
import { css } from "styled-components";

export const resetStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    &:focus-visible {
      outline: 2px solid var(--clr-primary);
    }
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--clr-primary);
    }
  }
`;
