const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config()
const NodeEnv = process.env.NODE_ENV;
dotenv.config({
    path: path.join(__dirname, `.env.${NodeEnv}`)
})
require("./blog")
app.get("/", (req, res,next) => {
    console.log(process.env.API_KEY);
    res.send("server run")
})
app.listen(process.env.PORT, () => {
    console.log("server run on port " + process.env.PORT);
})