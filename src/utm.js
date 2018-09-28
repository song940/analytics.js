
import query from './query';

export default Object.keys(query).reduce((utm, key) => {
  if(key.startsWith('utm_')) utm[key] = query[key];
  return utm;
}, {});