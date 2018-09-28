
export default (name, value) => {
  if (arguments.length === 1) {
    value = localStorage.getItem(name);
    if (value) value = JSON.parse(value);
    return value;
  } else {
    localStorage.setItem(name, JSON.stringify(value));
  }
}