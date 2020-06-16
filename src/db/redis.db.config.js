require('dotenv').config();
const fp = require('fastify-plugin');
const redis = require('redis');

const connectToRedisKVS = async (server, options, next) => {
    var rdis_client = await redis.createClient(process.env.REDIS_DB_PORT, process.env.REDIS_DB_HOST);
    rdis_client.on('connect', function() {
        console.log('Redis client connected');
    });
    
    rdis_client.on('error', function (err) {
        console.log('Something went wrong ' + err);
    });
    server.decorate('redisdb', rdis_client);
    next();
};

module.exports = fp(connectToRedisKVS);