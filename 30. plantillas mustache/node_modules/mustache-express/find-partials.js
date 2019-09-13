var mustache = require('mustache');


function iteratePartials(parsed) {
	var partialSet = {};

	parsed.filter(function (i) {
		return i[0] === ">";
	}).map(function (i) {
		return i[1];
	}).forEach(function (i) {
		partialSet[i] = true;
	});

	parsed.filter(function (i) {
		return i[0] === "#" || i[0] === '^';
	}).map(function(i) {
		iteratePartials(i[4]).map(function(i) {
			partialSet[i] = true;
		});
	});

	return Object.keys(partialSet);
}


function findPartials(template) {
	var partialSet = {};
	var parsed = mustache.parse(template);
	return iteratePartials(parsed);
}

module.exports = findPartials;
