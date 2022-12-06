// ===== C O N F I G

/** Keyframe format in point when item (toast) is hidden */
const ZERO_KEYFRAME = {
  height: "0px",
  marginBottom: "0px",
  padding: "0px",
  transform: "translate(200%, 0px)",
};

const SHOW_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
  duration: 1000,
  easing: "cubic-bezier(.47,.05,.66,1.55)",
  fill: "forwards",
};

const HIDE_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
  ...SHOW_ANIMATION_OPTIONS,
  easing: "cubic-bezier(.4,-0.72,.48,1.53)", // cubic-bezier(.44,-0.86,.54,1.76)
};

// ===== T Y P E S

type Keyframe = typeof ZERO_KEYFRAME;
type Sizes = Omit<Keyframe, "transform">;

interface IPlayFunctionParams extends Sizes {
  node: HTMLLIElement;
}

// ===== H E L P E R S

export const getToastSizes = (node: HTMLLIElement): IPlayFunctionParams => {
  const toastStyles = window.getComputedStyle(node);
  const height = toastStyles.getPropertyValue("height");
  const marginBottom = toastStyles.getPropertyValue("margin-bottom");
  const padding = toastStyles.getPropertyValue("padding");

  return {
    node,
    height,
    marginBottom,
    padding,
  };
};

export const playShowAnimation = ({
  node,
  height,
  marginBottom,
  padding,
}: IPlayFunctionParams) => {
  return node.animate(
    [
      ZERO_KEYFRAME,
      { height, marginBottom, padding, transform: "translate(0px, 0px)" },
    ],
    SHOW_ANIMATION_OPTIONS
  ).finished;
};

export const playHideAnimation = ({
  node,
  height,
  marginBottom,
  padding,
}: IPlayFunctionParams) => {
  return node.animate(
    [
      { height, marginBottom, padding, transform: "translate(0px, 0px)" },
      ZERO_KEYFRAME,
    ],
    HIDE_ANIMATION_OPTIONS
  ).finished;
};
