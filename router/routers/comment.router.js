const {Router} = require("express");
const router = Router();
router.get("/", (req, res, next) => {
    res.send("comments")
});
router.post("/", (req, res, next) => {
    res.send("created new comment")
});
router.delete("/:id", (req, res, next) => {
    res.send(`delete comment by id #${req.params.id}`)
});
router.patch("/:id", (req, res, next) => {
    res.send(`updated comment by id #${req.params.id}`)
});
module.exports = router