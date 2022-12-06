import type { RefObject } from "react";

/* 
  Terms: 
    - container (limit container) - HTML element in which the tooltip can move;
    - tooltip											- Moving Div Element with content
    - target (event target) 			- initiator of the tooltip appearance
    - cursorMargin 								- space between cursor and tooltip
    - containerPadding 						- min space between tooltip edges and container edges
*/

const SETTINGS = {
  cursorMargin: 15,
  containerPadding: 15,
};

/** Cursor position in container */
interface ICursorPosition {
  x: number;
  y: number;
}

/** For container and tooltip elements */
interface IElementSize {
  width: number;
  height: number;
}

/** Calculate cursors position (x, y) in container  */
const getCursorPositionInContainer = (
  e: React.MouseEvent,
  containerRect: DOMRect
): ICursorPosition => {
  return {
    x: e.clientX - containerRect.left,
    y: e.clientY - containerRect.top,
  };
};

/** Return width and height for container or tooltip */
const getElementSize = (rect: DOMRect): IElementSize => {
  const { width, height } = rect;
  return {
    width,
    height,
  };
};

/* Returns the distance from the cursor to the right side of the container */
const calculateFreeSpacesOnX = (
  containerWidth: number,
  cursorPositionX: number
) => {
  return containerWidth - cursorPositionX;
};

/** Determines the desired value of the vertical (top) offset of the tooltip */
const calculateTopOffset = (
  cursorPositionY: number,
  tooltipHeight: number,
  cursorMargin: number
) => {
  const offset = cursorPositionY - tooltipHeight - cursorMargin;
  return offset < 0 ? 0 : offset;
};

/** Determines the desired value of the horizontal (left) offset of the tooltip */
const calculateLeftOffset = (
  cursorPositionX: number,
  tooltipWidth: number,
  cursorMargin: number,
  containerPadding: number,
  freeSpaceX: number
) => {
  return freeSpaceX - cursorMargin - containerPadding < tooltipWidth
    ? cursorPositionX - tooltipWidth - cursorMargin - 5
    : cursorPositionX + cursorMargin;
};

/** Return objects with references on HTML elements: eventTarget, limit container, tooltip */
const getElementsReferences = (
  e: React.MouseEvent<Element>,
  containerSelector: string,
  tooltipRef: RefObject<HTMLDivElement>
) => {
  // if (e.target instanceof Element) 			// Разобраться
  const target = e.target as HTMLElement;
  const container = target.closest(containerSelector);
  const tooltip = tooltipRef.current;
  return {
    target,
    container,
    tooltip,
  };
};

/** Set inline style (left/top offset) on tooltip */
export const setProperty = <T extends "left" | "top" | "visibility">(
  element: HTMLElement | null,
  property: T,
  value: T extends "visibility" ? "hidden" | "visible" : number
) => {
  if (!element) return;
  const preparedValue =
    property === "visibility" ? (value as string) : `${value}px`;
  element.style.setProperty(property, preparedValue);
};

/**  */
export const moveTooltip = (
  e: React.MouseEvent<Element>,
  containerSelector: string,
  tooltipRef: RefObject<HTMLDivElement>
) => {
  const { target, container, tooltip } = getElementsReferences(
    e,
    containerSelector,
    tooltipRef
  );
  if (!target || !container || !tooltip) return;

  const containerRect = container.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  const containerSize = getElementSize(containerRect);
  const tooltipSize = getElementSize(tooltipRect);

  const cursorPosition = getCursorPositionInContainer(e, containerRect);

  const freeSpaceX = calculateFreeSpacesOnX(
    containerSize.width,
    cursorPosition.x
  );

  const leftOffset = calculateLeftOffset(
    cursorPosition.x,
    tooltipSize.width,
    SETTINGS.cursorMargin,
    SETTINGS.containerPadding,
    freeSpaceX
  );

  const topOffset = calculateTopOffset(
    cursorPosition.y,
    tooltipSize.height,
    SETTINGS.cursorMargin
  );

  setProperty(tooltip, "left", leftOffset);
  setProperty(tooltip, "top", topOffset);
};
