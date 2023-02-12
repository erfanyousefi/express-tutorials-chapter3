const express = require("express");
const { uploadFile } = require("./middleware/multer");
const { ErrorHandler, NotFoundError } = require("./util/errorHandler");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.post("/upload-single", uploadFile.single("image", 3),(req, res) => {
    res.send(req.file)
})
app.post("/upload-array", uploadFile.array("image", 3),(req, res) => {
    res.send(req.files)
})
app.post("/upload-fields", uploadFile.fields([
    {name: "image", maxCount: 2},
    {name: "file", maxCount: 1}
]),(req, res) => {
    res.send(req.files)
})
app.post("/upload-any", uploadFile.any(),(req, res) => {
    res.send(req.body)
})
app.use(NotFoundError)
app.use(ErrorHandler)
app.listen(3000, () => {
    console.log("server run on port 3000");
})