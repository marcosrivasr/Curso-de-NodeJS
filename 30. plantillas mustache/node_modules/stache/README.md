Stache
------
Stache is mustache.js for your node express apps.

![stache](http://f.cl.ly/items/1C3o2G3a121b1W1h0L1o/draft_lens8690031module75775171photo_1261762807mustacheold.jpg)

Whuuuuuut?
==========

Getting this junk running is SUPER easy! check the deets below...


setting it up
-------------

first...

    npm install stache

Now, when you're configuring your express app, just add this little code in somewhere near the top:

```javascript
app.set('view engine', 'mustache')
app.register(".mustache", require('stache'));
```

*BOOOM!* you're all set!


how to actually use it
----------------------

render your views with res.render...

```javascript
app.get('/', function (req, res) {
  res.render("index", {
    locals: {
      title: req.params.what
    },
    partials: {
      heading: '<title>{{title}}</title>'
    }
  });
});
```

Notice you can pass local vars here as well as partials to your templates.

You can also use helpers to pass mustache dynamic content!

```javascript
// helpers
app.helpers({
  three: function(){
    return 1 + 2;
  }
});

// dynamicHelpers
app.dynamicHelpers({
  page: function(req, res){
    return req.url;
  }
});
```

Reference these just like you would locals:

    You are currently viewing: {{page}}

Layouts
-------

Stache supports layouts! *swaggg!* Which means you can have something like this:

    <!-- layout.mustache -->
    <html>
    <head>
      {{>scripts}}
    </head>
    <body>
      {{{yield}}}
    </body>
    </html>

Note: <code>yield</code> is a special local var, which will be replaced automatically by the template you specified with res.render. Alternatively you can use the keyword <code>body</code>.


Partials
--------

Looking at the example above, check out that partial reference for scripts!! If when calling your res.render method you don't explicitly specify a script partial, stache will automatically check your views directory for a script.mustache to load as a partial. Pretty boss huh?


What? I still don't get it...
-----------------------------

No worries player, check the examples folder for a fully functional example.


shoutout
--------
major props to donpark (hbs), bitdrift, and obviously mustache.js