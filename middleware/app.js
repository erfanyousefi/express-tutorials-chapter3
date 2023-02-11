const express = require("express");
const morgan = require('morgan');
const omitEmpty = require('omit-empty');
const camelCaseKey = (...args) => import("camelcase-keys").then(({
    default: camelCaseKeys
}) => camelCaseKeys(...args));
const app = express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//first_name, first-name, lastname, last-name => firstName, lastName
//req.body['first-name']

function getTime(req, res, next) {
    req.time = Date.now();
    next();
}

function checkAuth(req, res, next) {
    const {
        username,
        password
    } = req.query;
    if (username == "erfan" && password == '1234') {
        return next()
    }
    res.send("Authentication is failed")
}
async function camelCase(req, res, next) {
    req.body = await camelCaseKey(req.body, {
        deep: true
    });
    req.query = await camelCaseKey(req.query);
    req.params = await camelCaseKey(req.params);
    next();
}
function removeEmptyFields(options = {}) {
    return function(req, res, next) {
        req.body = omitEmpty(req.body, options);
        next()
    }
}
// app.use(function(req, res, next) {
//     console.log("Log1");
//     next()
// }, function(req, res, next) {
//     console.log("Log2");
//     next()
// }, function(req, res, next) {
//     console.log("Log3");
//     next()
// }, function(req, res, next) {
//     console.log("Log4");
//     next()
// })
app.use(camelCase)
app.get("/", getTime, (req, res, next) => {
    console.log("Response route");
    res.send("finish request")
})
app.get("/users", checkAuth, getTime, (req, res) => {
    console.log(req.time);
    res.send("users")
})
app.get("/blogs", async (req, res) => {
    res.send({
        body: req.body,
        query: req.query,
        params: req.params
    })
})
app.post("/create", removeEmptyFields(), (req, res, next) => {
    res.send(req.body)
})
app.listen(3000, () => {
    console.log("server run on port 3000");
})