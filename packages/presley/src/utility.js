export const reorderArray = (from, to) => originalArray => {
  const movedItem = originalArray.find((item, index) => index === from);
  const remainingItems = originalArray.filter((item, index) => index !== from);

  return [
    ...remainingItems.slice(0, to),
    movedItem,
    ...remainingItems.slice(to),
  ];
};
