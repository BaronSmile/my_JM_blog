export const getFromLocalStorage =
  (valueName = '') => JSON.parse(localStorage.getItem(valueName));
export const removeFromLocalStorage =
  (valueName) => localStorage.removeItem(valueName);
export const setToLocalStorage =
  (valueName, data) => localStorage.setItem(valueName, JSON.stringify(data))