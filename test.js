'use strict';
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var broccoli = require('broccoli');
var traceur = require('./');

it('should transpile ES6 to ES5', function () {
	var builder = new broccoli.Builder(traceur('fixture/success'));
	return builder.build().then(function(dir) {
		var content = fs.readFileSync(path.join(dir.directory, 'fixture.js'), 'utf8');
		assert(/Foo/.test(content));
	});
});

it('complains if ES6 is invalid', function () {
	var builder = new broccoli.Builder(traceur('fixture/error'));
	return builder.build().then(function () {
		assert(false, 'should fail');
	}, function (err) {
		assert(/Unexpected token/.test(err.message));
	});
});
