export function latestUpdate() {
  const dt = new Date();
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  return `${padL(dt.getDate())}/${padL(
    dt.getMonth() + 1
  )}/${dt.getFullYear()}, ${padL(dt.getHours())}:${padL(
    dt.getMinutes()
  )}:${padL(dt.getSeconds())}`;
}
