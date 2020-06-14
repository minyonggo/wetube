import express from "express";
//const express = require('express');
const app = express();

const PORT = 4000;

const handleHome = (req, res) => {
    console.log(req);
    res.send('Hello from home!');
}
app.get("/", handleHome);

const handleProfile = (req, res) => {
    console.log(req);
    res.send("You are on my Profile!");
}
app.get("/profile", handleProfile);

const handleListening = () => {
    console.log(`Listening Start on : http://localhost:${PORT}`);
}
app.listen(PORT, handleListening);