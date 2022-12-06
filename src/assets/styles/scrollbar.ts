// external
import { css } from "styled-components";

export const scrollBarStyle = css`
  *::-webkit-scrollbar {
    width: 15px;
  }
  *::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 25px;
  }
  *::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
  }
  *::-webkit-scrollbar-track,
  *::-webkit-scrollbar-thumb,
  *::-webkit-scrollbar-thumb:hover {
    border: 4px solid transparent;
    background-clip: content-box;
  }
`;
