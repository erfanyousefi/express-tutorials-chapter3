const {Router} = require("express");
const { getUsers, createNewUser, deleteUser, updateUser } = require("../controllers/user.controller");
const router = Router();
router.get("/", getUsers);
router.post("/", createNewUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
module.exports = router