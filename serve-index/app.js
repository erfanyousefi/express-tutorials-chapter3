const express = require("express");
const serveIndex = require("serve-index")
const path = require("path");
const app = express();
app.use("/ftp", express.static("public/ftp"))
app.use("/ftp", serveIndex("public/ftp", {icons: true, stylesheet: "style.css"}))
app.get("/", (req, res, next) => {
    res.send("hello fav-icon")
})
app.listen(3000, () => {
    console.log("server run on port 3000");
})