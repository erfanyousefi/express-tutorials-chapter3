const express = require("express");
const {
    ErrorHandler,
    NotFoundError
} = require("./util/errorHandler");
const {
    BlogModel
} = require("./model/blog.model");
const {
    isValidObjectId
} = require("mongoose");
const omitEmpty = require("omit-empty");
const { body, validationResult } = require("express-validator");
const app = express();
require("./config/mongo.config")
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.get("/", (req, res, next) => {
    res.send("index page")
})
app.post("/create",async (req, res, next) => {
    try {
        const {
            title,
            text
        } = req.body;
        const result = await BlogModel.create({
            title,
            text,
        })
        res.send(result)
    } catch (error) {
        next(error)
    }
})
app.post("/new", async (req, res, next) => {
    try {
        const {
            title,
            text
        } = req.body;
        const newBlog = new BlogModel({
            title,
            text,
        })
        await newBlog.save()
        res.send(newBlog)
    } catch (error) {
        next(error)
    }
})
app.get("/insert-many", async (req, res, next) => {
    try {
        const newBlogs = await BlogModel.insertMany([{
                title: "1th title",
                text: "1th text",
            },
            {
                title: "2th title",
                text: "2th text",
            },
            {
                title: "3th title",
                text: "3th text",
            },
        ])
        res.send(newBlogs)
    } catch (error) {
        next(error)
    }
})
app.get("/blogs", async (req, res, next) => {
    const blogs = await BlogModel.find({});
    res.send({
        statusCode: 200,
        documentCount: blogs.length,
        blogs
    })
})
app.get("/blogs/:id", async (req, res, next) => {
    try {
        const {
            id
        } = req.params
        if (!isValidObjectId(id)) throw {
            status: 400,
            message: "your id is not valid id"
        }
        const blog = await BlogModel.findOne({
            _id: id
        });
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
app.delete("/blogs/:id", async (req, res, next) => {
    try {
        const {
            id
        } = req.params
        if (!isValidObjectId(id)) throw {
            status: 400,
            message: "your id is not valid id"
        }
        const result = await BlogModel.deleteOne({
            _id: id
        });
        res.send(result)
    } catch (error) {
        next(error)
    }
})
app.delete("/blogs", async (req, res, next) => {
    try {
        const result = await BlogModel.deleteMany({});
        res.send(result)
    } catch (error) {
        next(error)
    }
})
app.put("/blogs/:id", async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const newBodyObject = omitEmpty(req.body);
        const blog = await BlogModel.findOne({
            _id: id
        })
        if (!blog) throw {
            status: 404,
            message: "not found blog"
        }
        Object.assign(blog, newBodyObject);
        await blog.save()
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
app.patch("/blogs/:id", async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const newBodyObject = omitEmpty(req.body);
        const blog = await BlogModel.findOne({
            _id: id
        })
        if (!blog) throw {
            status: 404,
            message: "not found blog"
        }
        // const blog = await BlogModel.findOneAndUpdate({_id: id}, {$set: newBodyObject});
        const result = await BlogModel.updateOne({_id: id}, {
            $set: newBodyObject
        })
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
app.use(NotFoundError)
app.use(ErrorHandler)
app.listen(3000, () => {
    console.log("server run on port 3000");
})