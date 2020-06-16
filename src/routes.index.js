const fp = require('fastify-plugin');
const route = require('fastify');
const redis = require('redis');

const thinky = require('thinky');
const rt = require('./db/rethink.db.config');
const rd = require('./db/redis.db.config');
const pgd = require('./services/pagerduty.service');

const {generate, verify} = require('./lib/utils/jwt');
const {uuid} = require('uuidv4');

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

	route.post('/add/parcel', async (req, res) => {
		const pName = req.body.parcelKey;
		const uniquePK = pName + uuid().toString();
		var atok = await generate(uniquePK); // generate access token
		// store parcel in rethinkdb as a document
		return res.code(200).send({ accessToken: atok, expiresIn: 604800 });
	});

	route.post('/parcel/add/tracking', (req, res) => {
		const pName = req.body.parcelKey;
		const trackerNumber = req.body.trackerNumber;
		/* var accessToken = req.headers['x-access-token'];
		if (!accessToken) {return res.code(401).send({ msg: 'No token provided.'})};
		var result = await verifyBearerToken(accessToken);
		if (!result) {return res.code(500).send({ msg: 'Failed to authenticate token.'})}; */
		
		rd.set(`${pName}_parcel/tracking_number`, trackerNumber, (err, reply) => {
			if (err) throw err;
			if (reply == null) {
				res.code(500).send({ msg: 'Redis client response was null'})
			} else {
				res.code(201).send({ msg: reply });
			};
		});

		
	});

	route.post('/parcel/add/location', (req, res) => {
		const pName = req.body.parcelKey;
		const pLat = req.body.lat;
		const pLng = req.body.lng;
		const coordinate = {lat: pLat, lng: pLng};

		rd.set(`${pName}_parcel/coordinate`, JSON.stringify(coordinate), (err, reply) => {
			if (err) throw err;
			if (reply == null) {
				res.code(500).send({ msg: 'Redis client response was null'})
			} else {
				res.code(201).send({ msg: reply });
			};
		});
	});

	next();
};