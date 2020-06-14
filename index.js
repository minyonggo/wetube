const express = require('express');
const app = express();

const POST = 4000;

function handleHome(req, res) {
    console.log(req);
    res.send('Hello from home');
}
app.get("/", handleHome);

function handleProfile(req, res) {
    res.send("You are on my Profile");
}
app.get("/profile", handleProfile);

handleListening = () => {
    console.log(`Listening Start on : http://localhost:${POST}`);
}
app.listen(POST, handleListening);