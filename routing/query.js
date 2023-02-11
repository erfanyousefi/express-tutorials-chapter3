const express = require("express");
const posts = require("./post.json")
const queryString = require("querystring")
const app = express();
app.get("/foo", (req, res) => {
    console.log(queryString.parse("key=value&key2=value2&key3=value3"));
    console.log(queryString.stringify({
        key: 'value',
        key2: 'value2',
        key3: 'value3'
    }));
      
    const {key, key3, key2} = req.query;
    res.send({key, key3, key2, url: req.originalUrl})
})
app.get("/blogs", (req, res) => {
    const {title, desc} = req.query;
    const regexpTitle = new RegExp(title ?? '', 'gi');
    const regexpDesc = new RegExp(desc ?? '', 'gi');
    const filter = posts.filter(post => (post.title.match(regexpTitle) || post.body.match(regexpDesc)));
    res.send({posts: filter})
})

app.listen(3000, () => {
    console.log("server run on port 3000");
})