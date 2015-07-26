# indieweb-components

[VanillaJS]-based [Web Components] for the [IndieWeb]!

[VanillaJS]: http://vanilla-js.com
[Web Components]: http://webcomponents.org
[IndieWeb]: https://indiewebcamp.com

## [DEMO PAGE](https://myfreeweb.github.io/indieweb-components)

## Installation

Use [bower]! (Grab the [Web Components polyfill] while you're at it.)

```sh
$ bower install --save indieweb-components webcomponentsjs
```

In your `<head>`, conditionally load the polyfill:

```html
<script>
  if (!('registerElement' in document && 'import' in document.createElement('link')))
    document.write('<script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></sc'+'ript>');
</script>
```

And use `<link rel="import">` for the components you want.

[bower]: http://bower.io

## Elements

### indie-action

An implementation of the `indie-action` tag from [webactions](https://indiewebcamp.com/webactions).

For users who have configured their posting tools with the [indie-config](http://indiewebcamp.com/indie-config) protocol, the first `a` tag inside of the `indie-action` element will have its `href` replaced with the URL of the matching action.

The string `{url}` will be replaced in the `href` with the contents of the `with` attribute, resolved against the current domain.
The `indie-action` element also gets the `indie-configured` attribute when the config is loaded, so you can style the link differently from the fallback link using a selector like `[indie-configured] a`.

```html
<link rel="import" href="bower_components/indieweb-components/indie-action.html">

<indie-action do="reply" with="https://unrelenting.technology/notes/2015-07-03-12-48-01">
  <a href="https://twitter.com/intent/reply?tweet_id=616951543720493057">Reply</a>
</indie-action>
```

Requires Custom Elements, Custom Events and postMessage.  
No Shadow DOM -- the lite version of the [Web Components polyfill] is enough!

### fragmention-target

A custom element for displaying [fragmentions](https://indiewebcamp.com/fragmention).

In addition to marking the element that contains the linked text with the `fragmention` attribute, it is also able to wrap the exact linked text in a `fragmention-exact` tag.
To enable this functionality, add the `exact` attribute.

```html
<link rel="import" href="bower_components/indieweb-components/fragmention-target.html">

<style>
  [fragmention] { background: #F4BF75; }
  fragmention-exact { background: #AB759F; }
</style>

<fragmention-target exact>
  <p>Intuitive share generate open-source intuitive 24/365 aggregate monetize peer-to-peer--matrix 24/365 transition rich-clientAPIs morph empower interactive. Syndicate action-items vertical; plug-and-play engage recontextualize, "syndicate virtual data-driven e-markets, integrate synergies design extend," impactful productize standards-compliant sticky.</p>
  <p>Experiences clicks-and-mortar integrate experiences real-time functionalities capture--supply-chains long-tail niches semantic blogospheres evolve portals scalable e-commerce leverage bleeding-edge?</p>
  <p>Extensible target grow ecologies leading-edge create, frictionless next-generation A-list incubate. Vertical: reinvent seize interactive compelling post; syndicate granular systems drive impactful tag evolve strategize seamless.</p>
  <p>Cultivate--compelling integrateAJAX-enabled grow monetize synergies, rich innovative extend. Innovative; incentivize dynamic capture transition relationships, semantic create sticky, "facilitate optimize; share semantic impactful recontextualize e-services: next-generation bandwidth," leading-edge.</p>
</fragmention-target>
```

Requires Custom Elements.  
No Shadow DOM -- the lite version of the [Web Components polyfill] is enough!

## Contributing

Please feel free to submit pull requests!
Bugfixes and simple non-breaking improvements will be accepted without any questions :-)

By participating in this project you agree to follow the [Contributor Code of Conduct](http://contributor-covenant.org/version/1/2/0/).

## License

Copyright 2015 Greg V <greg@unrelenting.technology>  
Available under the ISC license, see the `COPYING` file

[Web Components polyfill]: https://github.com/webcomponents/webcomponentsjs
