import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
// external
import styled from "styled-components";
// hooks
import { useDebounce } from "@hooks";
// other
import { moveTooltip, setProperty } from "./Tooltip.helpers";
//

interface Props {
  className?: string;
  children: (data: any) => JSX.Element; // eslint-disable-line
}

export interface ITooltipCommands {
  show: (
    e: React.MouseEvent<Element>,
    containerSelector: string,
    data: any // eslint-disable-line
  ) => void;
  hide: () => void;
}

const Tooltip = forwardRef<ITooltipCommands, Props>(
  ({ className, children }, ref) => {
    const [data, setData] = useState<any>(); // eslint-disable-line
    const tooltipRef = useRef<HTMLDivElement>(null);
    const { debounce, resetDebounce } = useDebounce();

    useImperativeHandle(ref, () => ({
      show: (e, containerSelector, data) => {
        resetDebounce();
        setProperty(tooltipRef.current, "visibility", "visible");
        moveTooltip(e, containerSelector, tooltipRef);
        setData(data);
      },
      hide: () => {
        debounce(() => {
          setProperty(tooltipRef.current, "visibility", "hidden");
        });
      },
    }));

    // if (!ref) throw new Error('Set "ref" prop on tooltip');

    return (
      <div ref={tooltipRef} className={className}>
        {data ? children(data) : null}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default styled(Tooltip)`
  padding: 12px;
  position: absolute;
  z-index: 8;
  visibility: hidden;

  transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s,
    top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;

  background-color: rgb(255, 255, 255);
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  border-radius: 3px;
  opacity: 0.95;

  color: rgb(89, 89, 89);
  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  font-size: 12px;
  line-height: 12px;

  pointer-events: none;
`;
