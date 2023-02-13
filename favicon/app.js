const express = require("express");
const serveFavIcon = require("serve-favicon")
const path = require("path");
const app = express();
app.use(serveFavIcon(path.join(__dirname, "icon.webp")))
app.get("/", (req, res, next) => {
    res.send("hello fav-icon")
})
app.listen(3000, () => {
    console.log("server run on port 3000");
})