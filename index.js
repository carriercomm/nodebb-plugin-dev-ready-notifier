(function(module) {
	"use strict";

	var notifier = require('node-notifier'),
		emitter = module.parent.require('./emitter'),
		winston = module.parent.require('winston'),
		nconf = module.parent.require('nconf'),
		path = require('path'),
		open = require('open'),
		plugin = {};


	emitter.on('nodebb:ready', function() {
		notifier.notify({
			title: 'NodeBB',
			message: 'NodeBB is Ready',
			icon: path.join(nconf.get('base_dir'), 'public', 'logo.png'),
			'appIcon': path.join(nconf.get('base_dir'), 'public', 'logo.png'),
			wait: true,
			sound: 'true' //strange behavior
		}, function (err, response) {
			if (!err) {
				winston.info('[plugins/ready-notifier] Notification sent');
			} else {
				winston.error('[plugins/ready-notifier] ' + err.message);
			}
		});

		notifier.on('click', function (notifierObject, options) {
			var url = nconf.get('base_url');
			if (nconf.get('use_port')) {
				url = url + ':' + nconf.get('port');
			}

			open(url);
		});

	});

	module.exports = plugin;
}(module));