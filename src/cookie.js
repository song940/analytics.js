
const cookies = {};
document.cookie.replace(/(.*?)=(.*?)($|;)\s?/g, function (_, name, value) {
  cookies[unescape(name)] = unescape(value);
});



export default (name, value) => {
  if(!name) return cookies;
  if (!value) return cookies[name];
  document.cookie = escape(name) + '=' + escape(value) + ';';
};