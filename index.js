/*
 * OAuth2 for third party social networks
 */

// System modules

/* no system modules */

// Third-party libs
const express = require("express");
const axios = require("axios");

// Local modules
const cfg = require('./config');


// Locals
const auth_storage = {};
const VK_OAUTH_URL = 'https://oauth.vk.com/'


// HTTP handlers
const app = express();

/* === vk oauth2 handler === */
app.get("/vk", async (req, res) => {
    const { code, state } = req.query;
    console.log(`get access_token by code ${code} for`, state);

    try {
        const response = await axios({
            baseUrl: VK_OAUTH_URL,
            method: 'get',
            params: {
                client_id: cfg.VK_CLIENT_ID,
                client_secret: cfg.VK_CLIENT_SECRET,
                redirect_uri: `http://${cfg.HOST}:${cfg.PORT}/vk`,
                code: code
            }
        });
        auth_storage[state] = response.data;
        return res.status(200).json({ message: 'authorized' });
    } catch (error) {
        res.status(500).json({
            message: 'auth error',
            content: error.response.data
        });
    }
});

app.get("/vk/get-auth", (req, res) => {
    console.log("/vk/get-auth: ", req.query.state);

    let data = auth_storage[req.query.state];
    if (!data) {
        return res.status(404).json({
            'message': 'auth data not found for this state'
        })
    }
    res.json(data);
});
/* === end of vk oauth2 handler === */


// Initialization section
app.listen(cfg.PORT, () => {
    console.log(`content-cleaner backend runned on ${cfg.PORT}`);
});
