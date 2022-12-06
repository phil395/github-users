// external
import { css } from "styled-components";

export const chartCollors = {
  first: "#2caeba",
  second: "#5d62b5",
  third: "#ffc533",
  fourth: "#f2726f",
  fifth: "#8d6e63",
};

export const graphColors = {
  zeroLevel: "#ebedf0",
  firstLevel: "#9be9a8",
  secondLevel: "#40c463",
  thirdLevel: "#30a14e",
  fourthLevel: "#216e39;",
};

export const variables = css`
  :root {
    --clr-bg: #f7f7fc;
    --clr-primary: ${chartCollors.first};
    --clr-dark: #102a42;
    --clr-muted: #617d98;
    --radius-sm: 6px;
    --box-shadow: 0 2px 5px 0 rgba(51, 51, 79, 0.07);
    --grid-gap: 1rem;
    --offset-md: 25px;
  }

  @media screen and (max-width: 500px) {
    :root {
      --offset-md: 15px;
    }
  }
`;
