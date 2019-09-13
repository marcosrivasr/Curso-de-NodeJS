<img src="./img/logo.svg" />

[![Build Status](https://travis-ci.org/bryanburgers/node-mustache-express.png)](https://travis-ci.org/bryanburgers/node-mustache-express)

Mustache Express lets you use Mustache and Express (at least version 3) together, including auto-loading partials.

## Usage

    var mustacheExpress = require('mustache-express');

    // Register '.mustache' extension with The Mustache Express
    app.engine('mustache', mustacheExpress());

    app.set('view engine', 'mustache');
    app.set('views', __dirname + '/views');

## Parameters

The mustacheExpress method can take two parameters: the directory of the partials and the extension of the partials. When a partial is requested by a template, the file will be loaded from `path.resolve(directory, partialName + extension)`. By default, these values are determined by Express.

**Example:** If you want to create a folder for your partials in the view directory like so:

```
view
  ├── partials
  │   ├── footer.mst
  │   └── header.mst
  ├── error.mst
  └── index.mst
```

You should configure your view engine while passing the following parameters:

```js
/**
 * Pass the path for your partial directory and
 * the extension of the partials within the mustache-express method
 */
app.engine('mst', mustache(VIEWS_PATH + '/partials', '.mst'));
```

## Properties

The return function has a `cache` parameter that is an [LRU Cache](https://github.com/isaacs/node-lru-cache).

    var engine = mustacheExpress();
    var cache = engine.cache; // Caches the full file name with some internal data.
