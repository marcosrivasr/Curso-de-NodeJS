"use strict";

var findPartials = require('../find-partials');
var should = require('should');

function sort(arr) {
	var copy = arr.slice();
	copy.sort();
	return copy;
}

describe('findPartials', function() {
	it('should find a single partial', function() {
		var results = findPartials("{{> p1}}");
		sort(results).should.eql(["p1"]);
	});

	it('should find multiple partials', function() {
		var results = findPartials("{{> p1}} {{> p2}}");
		sort(results).should.eql(["p1", "p2"]);
	});

	it('should find partials inside a section', function() {
		var results = findPartials("{{#test}}{{> p1}}{{/test}}");
		sort(results).should.eql(["p1"]);
	});

	it('should find partials inside a negative conditional', function() {
		var results = findPartials("{{^test}}{{> p1}}{{/test}}");
		sort(results).should.eql(["p1"]);
	});

	it('should only return a partial once', function() {
		var results = findPartials("{{> p1}} {{> p1}}");
		sort(results).should.eql(["p1"]);
	});

});
