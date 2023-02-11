const express = require("express");
const app = express();
const users = [
    {id: 1, name: "user1"},
    {id: 2, name: "user2"},
    {id: 3, name: "user3"},
]
const products = [
    {id: 1, name: "product1"},
    {id: 2, name: "product2"},
    {id: 3, name: "product3"},
]
app.get("/", (req, res) => {
    console.log("welcome to route...");
    // res.send("Hello ExpressJS")
    // res.send("<h1>Hello ExpressJS</h1>")
    res.statusCode = 200
    res.status(200).send({message: "Hello ExpressJS"})
})
app.get("/users", function(req, res) {
    res.statusCode = 200
    res.json({
        users
    })
})
app.get("/products/:id?", function(req, res) {
    const {id} = req.params;
    let product = null;
    if(id){
        product = products.find(product => product.id == id);
        return res.send({
            statusCode: res.statusCode,
            data: {
                product
            }
        })
    }
    res.json({
        products 
    })
})
app.get("/users/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find(user => user.id == id);
    if(!user) {
        res.status(404).json({
            statusCode: res.statusCode,
            error: {
                message: "user not found"
            }
        })
        // res.status(404).send("Not Found user")
    }else {
        res.status(200).json({
            statusCode: res.statusCode,
            data: {
                user,
            }
        })
    }
})
app.get("/stuff/:id/:username/:version/:stuffID", (req, res) => {
    res.send(req.params)
})

app.listen(3000, () => {
    console.log("server run on port 3000");
})