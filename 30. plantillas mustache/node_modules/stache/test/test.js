var assert = require('assert');
var stache = require("../");

var options = {
  locals: {
    two: '2',
    four: 'for'
  },
  partials: {
    three: 'tres {{four}}'
  }
};

var source = 'one {{two}} {{>three}}';

//just render
var rendered = stache.render(source, options);
assert.equal(rendered, 'one 2 tres for');

//compile then render
var template = stache.compile(source, options);
var rendered = stache.render(template, options);
assert.equal(rendered, 'one 2 tres for');

//compile empty object without freaking out
var rendered = stache.render('feels good man', {});
assert.equal(rendered, 'feels good man');

console.log('looks good boss.')