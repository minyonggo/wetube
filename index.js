import express from "express";
//const express = require('express');
const app = express();

const PORT = 4000;

const betweenHome = (req, res, next) => {
    console.log("Between request and router");
    next();
}
const handleHome = (req, res) => {
    res.send('Hello from home!');
}
const handleProfile = (req, res) => {
    res.send("You are on my Profile!");
}
const handleListening = () => {
    console.log(`Listening Start on : http://localhost:${PORT}`);
}

app.use(betweenHome);
app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(PORT, handleListening);