#!/usr/bin/env node
var cp = require('child_process');


module.exports = (
	new Promise(function(resolve, reject) {
		var start = cp.spawn('source startflask.sh')

		start.stdout.on('data', function(data) {
			console.log('Starting server...')
			console.log(data);
		});

		start.on('close', function(code, signal) {
			console.log('done');
		});

		return true
	})
)
