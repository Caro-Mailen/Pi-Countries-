export const sortBy = (sortArray, key, sortDirection) => {
  if (sortDirection === "asc") {
    return sortArray.sort((a, b) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (b[key] > a[key]) {
        return -1;
      }
      return 0;
    });
  }
  return sortArray.sort((a, b) => {
    if (a[key] > b[key]) {
      return -1;
    }
    if (b[key] > a[key]) {
      return 1;
    }
    return 0;
  });
};
