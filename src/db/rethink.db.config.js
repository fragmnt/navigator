require('dotenv').config();
const fp = require('fastify-plugin');
const r_db = require('rethinkdb');

var r_conn = null;
let callback = (err, result) => {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
};

const connectToRethinkDB = async (server, options, next) => {
    r_conn = await r_db.connect( { host: process.env.RETHINKDB_HOST, port: process.env.RETHINKDB_PORT}, function(err, conn) {
        if (err) throw err;
        return conn;
    });

    await r_db.db('test').tableDrop('users').run(r_conn, callback);

    await r_db.db('test').tableCreate('users').run(r_conn, callback);

    server.decorate('rethinkdb', r_db);
    next();
};

module.exports = fp(connectToRethinkDB);