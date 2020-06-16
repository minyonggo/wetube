import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
//const express = require('express');
import morgan from "morgan";
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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);