export function setStorage(item, values) {
  const string = JSON.stringify(values);
  localStorage.setItem(item, string);
}
