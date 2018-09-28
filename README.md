## analytics.js [![analytics.js](https://img.shields.io/npm/v/analytics.js.svg)](https://npmjs.org/analytics.js)

> analytics sdk

### Installation

```bash
$ npm install https://github.com/song940/analytics.js.git
```

### Example

```html
<script src="./analytics.js"></script>

<a id="app" class="btn" href="http://lsong.org">trackClick</a>

<script>
  const ga = Analytics();
  ga.trackView();
  document.addEventListener('click', e => {
    e.preventDefault();
    ga.trackClick(e);
  });
</script>
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---