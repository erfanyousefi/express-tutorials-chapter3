const express = require("express");
const app = express();
const allRouters = require("./routers");
app.use(allRouters)
app.listen(3000, () => {
    console.log("server run on port 3000");
})