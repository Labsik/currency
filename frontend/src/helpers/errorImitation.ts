export const errorImitation = () => {
  let n = Number(window.localStorage.getItem("requestCount"));
  if (Number.isNaN(n)) n = 0;
  if (n >= 5) n = 0;
  n++;

  window.localStorage.setItem("requestCount", n.toString());
};
