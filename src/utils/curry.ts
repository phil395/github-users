// eslint-disable-next-line
type func = (arg: any) => any;

// eslint-disable-next-line
type argument = Record<string, any> | number | string | Date;

const isFunc = (x: func | argument): x is func => {
  if (typeof x === "function") return true;

  return false;
};

// eslint-disable-next-line
export const curry = (a: func) => (b: func | Record<string, any>) => {
  if (!isFunc(b)) return a(b);

  return curry((x: argument) => a(b(x)));
};
