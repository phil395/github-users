import { FC, memo, useEffect, useRef } from "react";
// external
import styled, { css, keyframes } from "styled-components";
// hooks
import { useActions } from "@hooks";
// other
import { curry } from "@utils";
import {
  getToastSizes,
  playHideAnimation,
  playShowAnimation,
} from "./Toastify.animation";
import { Colors, getToastColors } from "./Toastify.helpers";
// types
import type { IToast } from "@store";
//

const TIMER_SELECTOR = 'svg[width="100%"] rect[x="0"][y="0"]';

interface Props {
  toast: IToast;
}

const Toast: FC<Props> = memo(({ toast }) => {
  const toastRef = useRef<HTMLLIElement>();
  const { removeToast } = useActions();

  const colors = getToastColors(toast.type);

  const purgeToast = async () => {
    if (!toastRef.current) return;
    await curry(playHideAnimation)(getToastSizes)(toastRef.current);
    removeToast(toast.id);
  };

  useEffect(() => {
    const timer = toastRef.current?.querySelector(TIMER_SELECTOR);
    timer?.addEventListener("animationend", purgeToast);

    return () => timer?.removeEventListener("animationend", purgeToast);
  }, []);

  return (
    <Root
      colors={colors}
      ref={(node) => {
        if (!node) return;
        toastRef.current = node;
        curry(playShowAnimation)(getToastSizes)(node);
      }}
      onClick={purgeToast}
    >
      {toast.text}
      <Timer duration={toast.timer}>
        <rect x={0} y={0} fill="currentColor"></rect>
      </Timer>
    </Root>
  );
});

const reducingWidth = keyframes`
	from {
    width: 100%;
  }
	to {
		width: 0%;
	}
`;

type TimerProps = {
  duration: number;
};

const Timer = styled.svg.attrs({
  width: "100%",
  height: "5px",
}) <TimerProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom-left-radius: var(--radius-sm);
  border-bottom-right-radius: var(--radius-sm);
  overflow: hidden;

  rect {
    height: 100%;
    animation: ${reducingWidth} ${(props) => props.duration}s linear 0s 1
      running;
  }
`;

type RootProps = {
  colors: Colors;
};

const Root = styled.li<RootProps>`
  width: 320px;
  margin-bottom: var(--offset-md);
  border: 1px solid transparent;
  padding: var(--offset-md);
  box-shadow: 0px 0px 10px 5px #a0a0a033;
  border-radius: var(--radius-sm);
  position: relative;

  ${(props) => css`
    color: ${props.colors.text};
    background-color: ${props.colors.bg};
    border: 1px solid ${props.colors.border};
  `}

  &:hover rect {
    animation-play-state: paused;
  }

  @media screen and (max-width: 380px) {
    padding: 8px 8px 14px 8px;
    font-size: 13px;
    width: 280px;
  }
`;

export default Toast;
