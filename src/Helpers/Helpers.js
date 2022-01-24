export function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}
