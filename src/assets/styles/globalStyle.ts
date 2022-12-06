// external
import { createGlobalStyle } from "styled-components";
// styles
import { resetStyle } from "./reset";
import { variables } from "./variables";
import { scrollBarStyle } from "./scrollbar";

export const GlobalStyle = createGlobalStyle`
  ${variables}
	${resetStyle}
	${scrollBarStyle}

	body {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		background-color: var(--clr-bg);
		overflow-y: scroll; // fix page jerking when scrollbar disappears
	}
`;
