// :.

const PORT = 8009;
const ffy = require('fastify')({
	bodyLimit: 1048576 * 2,
	logger: true
});

// :.

const cors = require('fastify-cors');
const helmet = require('fastify-helmet');
const formBody = require('fastify-formbody'); 

const rethinkDB = require('./src/db/rethink.db.config');
const redisDB = require('./src/db/redis.db.config');
const pagerdutySDK = require('./src/services/pagerduty.service');

const router = require('./src/routes.index');

// :.

ffy.register(router, { prefix: '/v1'});
ffy.register(cors, { origin: '*', preflight: true });
ffy.register(helmet);
ffy.register(formBody, { bodyLimit: 1048576 });

ffy.register(rethinkDB, err => console.error(err));
ffy.register(redisDB, err => console.error(err));
ffy.register(pagerdutySDK, err => console.error(err));

// :.

ffy.listen(PORT, (err, ADDRESS) => {
	if (err) throw err;
});