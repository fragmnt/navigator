require('dotenv').config();
const fp = require('fastify-plugin');
const PagerDuty = require('@mapbox/pagerduty');

const connectToPagerDuty = async (server, options, next) => {
    const pd = new PagerDuty({
        pagerDutyToken: process.env.PAGERDUTY_API_TOKEN
    });
    server.decorate('pagerduty', pd);
    next();
};

module.exports = fp(connectToPagerDuty);