# indieweb-components

[VanillaJS]-based [Web Components] for the [IndieWeb]!

[VanillaJS]: http://vanilla-js.com
[Web Components]: http://webcomponents.org
[IndieWeb]: https://indiewebcamp.com

## Elements

### indie-action

An implementation of the `indie-action` tag from [webactions](https://indiewebcamp.com/webactions).

For users who have configured their posting tools with the [indie-config](http://indiewebcamp.com/indie-config) protocol, the first `a` tag inside of the `indie-action` element will have its `href` replaced with the URL of the matching action.

The string `{url}` will be replaced in the `href` with the contents of the `with` attribute, resolved against the current domain.
The `indie-action` element also gets the `indie-configured` attribute when the config is loaded, so you can style the link differently from the fallback link using a selector like `[indie-configured] a`.

```html
<indie-action do="reply" with="https://unrelenting.technology/notes/2015-07-03-12-48-01">
  <a href="https://twitter.com/intent/reply?tweet_id=616951543720493057">Reply</a>
</indie-action>
```

Requires Custom Elements, Custom Events and postMessage.  
No Shadow DOM -- the lite version of the [Web Components polyfill](https://github.com/webcomponents/webcomponentsjs) is enough!

## Contributing

Please feel free to submit pull requests!
Bugfixes and simple non-breaking improvements will be accepted without any questions :-)

By participating in this project you agree to follow the [Contributor Code of Conduct](http://contributor-covenant.org/version/1/2/0/).

## License

Copyright 2015 Greg V <greg@unrelenting.technology>  
Available under the ISC license, see the `COPYING` file
