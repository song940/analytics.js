import env from './env';
import utm from './utm';
import uuid from './uuid';
import fetch from './fetch';
import query from './query';
import cookie from './cookie';
import storage from './storage';

function Analytics(config){
  if(!(this instanceof Analytics))
    return new Analytics(config);
  this.config = {};
  Object.assign(this.config, {
    platform: 'web',
    api: '/analytics'
  }, config);
  const url = this.get('api');
  this.env = env;
  this.utm = utm;
  this.cookies = cookie;
  var _uuid = cookie('uuid');
  if(!_uuid) {
    _uuid = uuid();
    cookie('uuid', _uuid);
  }
  this.env.uuid = _uuid;
  this.send = Analytics.createShipper(function(data, done){
    return Analytics.ajax(url, {
      env: this.env,
      utm: this.utm,
      data
    }, done);
  }.bind(this));
  return this;
};

Analytics.seq = 0;
Analytics.prototype.__defineGetter__('seq', function(){
  return Date.now() + (++Analytics.seq);
});

Analytics.createShipper = function(post){
  if(typeof post !== 'function')
    throw new TypeError('[Analytics.js] "post" must be a function ');
  const queue = storage('$analycits.q') || [];
  function push(data){
    queue.push(data);
    storage('$analycits.q', queue);
  };
  setInterval(function send(){
    const i = queue.length;
    i && post(queue.slice(0, i), function(){
      queue.splice(0, i);
      storage('$analycits.q', queue);
    });
  }, 3000);
  return push;
};

Analytics.prototype.get = function(k){
  return this.config[k];
};

Analytics.prototype.set = function(k, v){
  return this.config[k] = v;
};

Analytics.prototype.track = function(name, data, time){
  time = time || Date.now();
  return this.send({ name, data, time });
};

Analytics.prototype.trackEvent = function(name, event){
  return this.track('$event', {
    name,
    event
  });
};

Analytics.prototype.trackPage = function(url, title, referer){
  url = url || location.href;
  title = title || document.title;
  referer = referer || document.referrer;
  return this.trackEvent('$page', {
    url,
    title,
    referer
  });
};

Analytics.prototype.trackClick = function(e){
  const el = e.target;
  return this.trackEvent('$click', {
    'id': el.id,
    'href': el.href,
    'tag': el.tagName,
    'class': el.className,
    'text': el.textContent,
  });
};

export default Analytics;