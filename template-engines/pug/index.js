const express = require("express");
const path = require("path")
const { NotFoundError, ErrorHandler } = require("./util/errorHandler");
const app = express();
// app.use("/static", express.static("public"))
app.use(express.static("public"))
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"))
app.get("/", (req, res, next) => {
    const users = [ 
        {
            id: 1,
            name: "ali"
        },
        {
            id: 2,
            name: "erfan"
        },
        {
            id: 3,
            name: "mahmood"
        },
    ]
    res.render("index", {
        link: "https://botostart.ir",
        section: "this is my section",
        users
    })
})
app.use(NotFoundError);
app.use(ErrorHandler);
app.listen(3000, () => {
    console.log("server run on port 3000");
})