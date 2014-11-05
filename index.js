(function(module) {
	"use strict";

	var growl = require('growl'),
		emitter = module.parent.require('./emitter'),
		winston = module.parent.require('winston'),
		plugin = {};


	emitter.on('nodebb:ready', function() {
		growl('NodeBB is Ready', { title: 'NodeBB'}, function(err){
			if (!err) {
				winston.info('[plugins/ready-notifier] Notification sent');
			}
		});
	});

	module.exports = plugin;
}(module));