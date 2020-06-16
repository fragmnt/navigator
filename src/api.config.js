require('dotenv').config();

module.exports = {
    secret: process.env.CLIENT_SECRET,
    id: process.env.CLIENT_ID
};