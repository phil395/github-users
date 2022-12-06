import { useLayoutEffect, useState } from "react";

type MediaQueryString = `(${"max" | "min"}-width: ${number}px)`;

export const useMatchMedia = (query: MediaQueryString): boolean => {
  const [isMatched, setIsMatched] = useState<boolean>(() => {
    return window.matchMedia(query).matches;
  });

  useLayoutEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => {
      setIsMatched(e.matches);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMatched;
};

