export function getStorage(item) {
  const storage = localStorage.getItem(item);
  const values = JSON.parse(storage);
  return values;
}
