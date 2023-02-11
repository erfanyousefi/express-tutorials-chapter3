const express = require("express");
const path = require("path")
const { NotFoundError, ErrorHandler } = require("./util/errorHandler");
const app = express();
app.use(express.static("public"))
app.set("view engine", "ejs")
app.get("/", (req, res, next) => {
    const h1 = "<h1>h1</h1>";
    const blogs = require("./blogs.json")
    res.render("index", {h1, blogs, blogTitle: "Ejs Blogs"})
})
app.use(NotFoundError);
app.use(ErrorHandler);
app.listen(3000, () => {
    console.log("server run on port 3000");
})