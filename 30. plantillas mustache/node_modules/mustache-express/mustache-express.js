"use strict";

var async = require('async');
var findPartials = require('./find-partials');
var fs = require('fs');
var lruCache = require('lru-cache');
var mustache = require('mustache');
var path = require('path');

// Make sure Object.assign exists. If not, default to Node's internal extend.
var extend = Object.assign;
if (!extend) {
	extend = require("util")._extend;
}

// Load a single file, and return the data.
function loadFile(fullFilePath, callback) {
	fs.readFile(fullFilePath, "utf-8", function(err, data) {
		if (err) {
			return callback(err);
		}

		return callback(null, data);
	});
}

// Load a file, find it's partials, and return the relevant data.
function handleFile(name, file, options, cache, callback) {
	var cachedData;
	if(!options || !options.settings || options.settings['view cache'] !== false) {
		cachedData = cache && cache.get(file);
	}
	if (!cachedData) {
		loadFile(file, function(err, fileData) {
			if (err) {
				return callback(err);
			}

			var partials;
			try {
				partials = findPartials(fileData);
			} catch (err) {
				return callback(err);
			}

			var data = {
				name: name,
				data: fileData,
				partials: partials
			};
			if (cache) {
				cache.set(file, data);
			}
			return callback(null, data);
		});
	}
	else {
		return callback(null, cachedData);
	}
}

// Using the return data from all of the files, consolidate the partials into
// a single list
function consolidatePartials(arr) {
	var partialsSet = {};
	arr.forEach(function(item) {
		item.partials.forEach(function(partial) {
			partialsSet[partial] = true;
		});
	});
	return Object.keys(partialsSet);
}

// Of the partials given, which haven't been loaded yet?
function findUnloadedPartials(partialNames, loadedPartials) {
	return partialNames.filter(function(partialName) {
		return !(partialName in loadedPartials);
	});
}

// Load all of the partials recursively
function loadAllPartials(unparsedPartials, partialsDirectory, partialsExtension, options, cache, partials, callback) {
	if (!partials) {
		partials = {};
	}

	// This function is called recursively. This is our base case: the point where we
	// don't call recursively anymore.
	// That point is when there are no partials that need to be parsed.
	if (unparsedPartials.length === 0) {
		return callback(null, partials);
	}

	async.map(unparsedPartials, function(partial, next) {
		var fullFilePath;
		if('function' === typeof partialsDirectory){
			fullFilePath = partialsDirectory(partial,partialsExtension);
		} else {
			fullFilePath = path.resolve(partialsDirectory, partial + partialsExtension);
		}
		return handleFile(partial, fullFilePath, options, cache, next);
	}, function(err, data) {
		if (err) {
			return callback(err);
		}

		// Add all of the data to the 'partials' object
		data.forEach(function(partialData) {
			partials[partialData.name] = partialData.data;
		});

		// Get all of the partials that are referenced by the data we've loaded
		var consolidatedPartials = consolidatePartials(data);

		// Get all of the partials that we haven't loaded yet.
		var partialsToLoad = findUnloadedPartials(consolidatedPartials, partials);

		// Recursive call.
		return loadAllPartials(partialsToLoad, partialsDirectory, partialsExtension, options, cache, partials, callback);
	});
}

// Load the root template, and all of the partials that go with it
function loadTemplateAndPartials(templateFile, partialsDirectory, partialsExtension, options, cache, callback) {
	handleFile(null, templateFile, options, cache, function(err, partialData) {
		if (err) {
			return callback(err);
		}

		return loadAllPartials(partialData.partials, partialsDirectory, partialsExtension, options, cache, null, function(err, partials) {
			if (err) {
				return callback(err);
			}

			return callback(null, partialData.data, partials);
		});
	});
}

function render(templatePath, viewDirectory, extension, options, cache, callback) {

	loadTemplateAndPartials(templatePath, viewDirectory, extension, options, cache, function(err, template, partials) {
		if (err) {
			return callback(err);
		}

		var data = mustache.render(template, options, partials);
		return callback(null, data);
	});
}

// Create a renderer.
// This is the entry point of the module.
function create(directory, extension) {
	var cache = lruCache({
		max: 50000,
		length: function(item) {
			return item.data.length;
		}
	});
	var rendererWrapper = function(templatePath, options, callback) {
		var viewDirectory = directory || options.settings.views;
		if(options.settings && 'function' === typeof options.settings.viewHelper){
			viewDirectory = options.settings.viewHelper;
		}
		var viewExtension = extension || '.' + options.settings['view engine'];
		render(templatePath, viewDirectory, viewExtension, options, rendererWrapper.cache, function(err, data) {
			if (err) {
				return callback(err);
			}

			// If layout is defined, load it
			if (options && options.settings && options.settings.layout) {

				// Load the layout & partials
				var layoutPath = path.resolve(viewDirectory, options.settings.layout + viewExtension);
				loadTemplateAndPartials(layoutPath, viewDirectory, viewExtension, options, rendererWrapper.cache, function(err, template, partials) {
					if (err) {
						return callback(err);
					}

					// Render the view into layout and run the callback
					var fulldata = mustache.render(template, extend({yield: data}, options), partials);
					callback(err, fulldata);
				});

			} else {
				callback(err, data);
			}
		});
	};
	rendererWrapper.cache = cache;
	return rendererWrapper;
}

module.exports = create;
