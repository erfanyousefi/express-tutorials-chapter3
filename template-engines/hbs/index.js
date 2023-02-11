const express = require("express");
const path = require("path")
const hbs = require("hbs");
const { NotFoundError, ErrorHandler } = require("./util/errorHandler");
const app = express();
hbs.registerPartials(path.join(__dirname, "views/partials"))
app.use(express.static("public"))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))
app.get("/", (req, res, next) => {
    const blogs = require("./blogs.json")
    res.render("index", {
        blogs,
        blogTitle: "Three latest blogs"
    })
})
app.use(NotFoundError);
app.use(ErrorHandler);
app.listen(3000, () => {
    console.log("server run on port 3000");
})