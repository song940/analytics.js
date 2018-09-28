# Analytics.js


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