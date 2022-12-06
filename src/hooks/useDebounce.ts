import { useCallback, useRef } from "react";

export const useDebounce = () => {
  const timerId = useRef<null | NodeJS.Timeout>(null);

  const resetDebounce = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  }, []);

  const debounce = useCallback((func: () => void, ms = 120) => {
    resetDebounce();
    timerId.current = setTimeout(func, ms);
  }, []);

  return { debounce, resetDebounce };
};
