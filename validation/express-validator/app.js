const express = require("express");
const { ErrorHandler, NotFoundError } = require("./util/errorHandler");
const { validationResult } = require("express-validator");
const { loginValidator, registerValidator } = require("./validators/auth.validatior");
const { checkValidation } = require("./middlewares/validator");
const { IdValidator } = require("./validators/blog.validator");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/login",loginValidator(), checkValidation, (req, res) => {
    res.send(req.body)
})
app.post("/register",registerValidator(), checkValidation, (req, res) => {
    res.send(req.body)
})
app.get("/blogs/:id",IdValidator, checkValidation, (req, res) => {
    res.send(req.params)
})

app.use(NotFoundError)
app.use(ErrorHandler)
app.listen(3000, () => {
    console.log("server run on port 3000");
})