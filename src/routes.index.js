const fp = require('fastify-plugin');
const route = require('fastify');

const thinky = require('thinky');
const rethinkdb = require('./db/rethink.db.config');
const redis = require('./db/redis.db.config');
const pagerduty = require('./services/pagerduty.service');

module.exports = function (route, options, next) {
	route.get('/', (req, res) => {
		return res.code(200).send({ 
			status: 200, 
			msg: 'API Version: v0.0.1',
			client: {
				request: {
					ip_address: req.ip
				}
			}
		});
	});
	next();
};