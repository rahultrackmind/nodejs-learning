// require("dotenv").config();
import express from 'express';
// const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});
app.get('/login', (req, res) => {
    res.send("Login Page");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
