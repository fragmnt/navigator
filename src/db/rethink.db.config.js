require('dotenv').config();
const fp = require('fastify-plugin');
const r_db = require('rethinkdb');

var r_conn = null;
const connectToRethinkDB = async (server, options, next) => {
    await r_db.connect( { host: process.env.RETHINKDB_HOST, port: process.env.RETHINKDB_PORT}, function(err, conn) {
        if (err) throw err;
        r_conn = conn;
    });
    server.decorate('rethinkdb', r_conn);
    next();
};

module.exports = fp(connectToRethinkDB);