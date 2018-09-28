
function Analytics(config){
  if(!(this instanceof Analytics))
    return new Analytics(config);
  this.config = {};
  Object.assign(this.config, {
    api: '/analytics'
  }, config);
  this.env = this.getEnv();
  // !! for debug ...
  this.send = Analytics.createShipper(fakeAjax);
  // this.send = Analytics.createShipper(Analytics.ajax);
  return this;
};
// !! just for debug ...
function fakeAjax(data, done){
  console.debug('fake http: POST', data);
  setTimeout(done, 1000); // network delay ..
}

Analytics.seq = 0;
Analytics.prototype.__defineGetter__('seq', function(){
  return Date.now() + (++Analytics.seq);
});

Analytics.prototype.getEnv = function(){
  const env = {};
  env.ua = navigator.userAgent;
  const cookie = document.cookie;
  this.cookies = Analytics.parseCookie(cookie);
  env.uuid = this.cookie('uuid');
  if(!env.uuid) {
    env.uuid = Analytics.uuid();
    this.cookie('uuid', env.uuid);
  }
  return env;
};

Analytics.createShipper = function(post){
  if(typeof post !== 'function')
    throw new TypeError('[Analytics.js] "post" must be a function ');
  const queue = Analytics.storage('$analycits.q') || [];
  function push(data){
    queue.push(data);
    Analytics.storage('$analycits.q', queue);
  };
  function send(){
    const i = queue.length;
    i && post(queue.slice(0, i), function(){
      queue.splice(0, i);
      Analytics.storage('$analycits.q', queue);
    });
  };
  setInterval(send, 3000);
  return push;
};

Analytics.parseCookie = function(cookie){
  const cookies = {};
  cookie.replace(/(.*?)=(.*?)($|;)\s?/g, function(_, name, value){
    cookies[ unescape(name) ] = unescape(value);
  });
  return cookies;
};

Analytics.storage = function(name, value){
  if(arguments.length === 1){
    value = localStorage.getItem(name);
    if(value) value = JSON.parse(value);
    return value;
  }else{
    localStorage.setItem(name, JSON.stringify(value));
  }
};

Analytics.uuid = function() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

Analytics.prototype.get = function(k){
  return this.config[k];
};

Analytics.prototype.set = function(k, v){
  return this.config[k] = v;
};

Analytics.prototype.cookie = function(name, value){
  if(arguments.length === 1)
    return this.cookies[name];
  document.cookie = escape(name) +'='+ escape(value) + ';'; 
  return this;
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

Analytics.prototype.trackView = function(url, title, referer){
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