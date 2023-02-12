const {Router} = require("express");
const userRouter = require("./user.router");
const blogRouter = require("./blog.router");
const commentRouter = require("./comment.router");
const router = Router();
function setTime(req, res, next) {
    req.time = Date.now();
    next();
}
router.use(setTime)
router.use("/user", userRouter)
router.use("/blog",setTime, blogRouter)
router.use("/comment", commentRouter)
module.exports = router