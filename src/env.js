
const conn = navigator.connection;

export default {
  ua: navigator.userAgent,
  url: location.href,
  referer: document.referrer,
  language: navigator.language,
  platform: navigator.platform,
  network: {
    downlink: conn.downlink,
    type: conn.effectiveType,
    online: navigator.onLine,
  }
};
