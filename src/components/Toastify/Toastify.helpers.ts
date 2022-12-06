// for animation helpers see file: ./Toastify.animation.ts

// other
import { ToastType } from "@store";
//

export type Colors = {
  text: string;
  bg: string;
  border: string;
};

const COLORS_MAP: Record<ToastType, Colors> = {
  [ToastType.Error]: { text: "#842029", bg: "#f8d7da", border: "#f5c2c7" },
  [ToastType.Success]: { text: "#0f5132", bg: "#d1e7dd", border: "#badbcc" },
  [ToastType.Info]: { text: "#055160", bg: "#cff4fc", border: "#b6effb" },
};

export const getToastColors = (type: ToastType): Colors => {
  return COLORS_MAP[type];
};
