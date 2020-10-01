# Highlight Settings

## Highlight Type

There are two ways Hyper SDK can highlight a keyword on your web pages:

- `insertion`
  - Iterate all the document nodes and the children of the dom nodes, and find the matches for text nodes and the parent of text nodes
  - Insert `mstr-hi` node with the required information as the parent of matched text
  - Render highlights
- `overlay`
  - Iterate the dom nodes, and get the whole text, find matches for the text
  - Check which matches belong to which node, and attach the highlight node
  - Render highlights

You may choose the highlight type in the initialization settings.

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          autoLogin: true,
          authMode: mstrHyper.AUTH_MODES.GUEST
        },
        highlighting: {
          // choose the Highlight Type, `insertion` will be use if omitted.
          type: mstrHyper.HIGHLIGHT_TYPES.OVERLAY
        }
      })
      .then(function () {
        console.log('MicroStrategy HyperIntelligence is initialized.');
      })
      .catch(function (error) {
        console.error(error);
      });
  });
</script>
```

## Whether to highlight iframes

A web page can embed another web page with the `iframe` tag in HTML. You may choose to let Hyper SDK highlight the nested web pages by setting `highlightIframes` to `true`.

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          autoLogin: true,
          authMode: mstrHyper.AUTH_MODES.GUEST
        },
        highlighting: {
          // Highlight iframes, `false` by default.
          highlightIframes: true
        }
      })
      .then(function () {
        console.log('MicroStrategy HyperIntelligence is initialized.');
      })
      .catch(function (error) {
        console.error(error);
      });
  });
</script>
```
