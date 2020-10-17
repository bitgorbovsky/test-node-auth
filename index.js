const express = require("express");
const app = express();
const axios = require("axios");

const PORT = process.env.PORT || 9090;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;

const tempIdTimeout = 30 * 1000 * 60; // 30 min
const memoryStore = {};

app.get("/vk", async (req, res) => {
    console.log("-".repeat(100));
    const { code, state } = req.query;
    console.log(`Get access_token by code ${code} for`, state);

    try {
        const response = await axios.get(
            `https://oauth.vk.com/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=http://localhost:9090/vk&code=${code}`
        );
        memoryStore[state] = response.data;
    } catch (error) {
        console.log(error.response.data);
    }

    res.send("Вы успешно авторизованы!");
});

app.get("/get-auth", (req, res) => {
    console.log("/get-auth", req.query);

    res.send(memoryStore[req.query.state] || { error: "not found", code: 404 });
});

app.listen(PORT, () => {
    console.log(`Server for igor runned on ${PORT}`);
});

// CLIENT_ID=7631764 CLIENT_SECRET=ltBTW8u4ozvXx5hXxRc1 PORT=9090 node index
// https://oauth.vk.com/authorize?client_id=7631764&redirect_uri=http://localhost:9090/vk&scope=audio&response_type=code&v=5.52&state=123
