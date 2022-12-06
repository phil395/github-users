export const toPascalCase = (str: string) => {
  const arr = Array.from(str);
  arr[0] = arr[0].toUpperCase();
  return arr.join("");
};
