const getNextElement = (list: any[], value: any) => {
  const currIndex = list.indexOf(value);
  const nextIndex = currIndex === list.length - 1 ? 0 : currIndex + 1;

  return list[nextIndex];
};

export default getNextElement;
