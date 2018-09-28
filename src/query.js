
export const query = qs => qs
  .split('&')
  .reduce((query, part) => {
    const parts = part.split('=');
    const key = parts[0];
    const value = parts[1] ? decodeURIComponent(parts[1]) : !0;
    if (query[key]) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
    return query;
  }, {});

export default query(location.search.slice(1));
