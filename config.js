/*
 * Config module
 * */

const process = require('process');

module.exports = {
    PORT: process.env.PORT || 9090,
    VK_CLIENT_SECRET: process.env.VK_CLIENT_SECRET,
    VK_CLIENT_ID: process.env.VK_CLIENT_ID,
    HOST: process.env.HOST
};
