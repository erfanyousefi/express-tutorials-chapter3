const express = require("express");
const {
    ErrorHandler,
    NotFoundError
} = require("./util/errorHandler");
const {
    validate
} = require("express-validation");
const {
    loginValidation, registerValidation
} = require("./validators/auth.validator");
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.post("/login", validate(loginValidation), (req, res) => {
    res.send(req.body)
})
app.post("/register", validate(registerValidation), (req, res) => {
    res.send(req.body)
})

app.use(NotFoundError)
app.use(ErrorHandler)
app.listen(3000, () => {
    console.log("server run on port 3000");
})