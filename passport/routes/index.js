const { hashSync } = require("bcrypt");
const {userModel} = require("../model/user.model");
const { redirectIfIsAuth, checkAuthentication } = require("../middleware");
const router = require("express").Router();
function initRoutes(passport) {
    router.get("/", (req, res) => {
        res.render("index", {title: "home"})
    })
    router.get("/login", redirectIfIsAuth, (req, res) => {
        res.render("login", {title: "login"})
    })
    router.get("/register", redirectIfIsAuth, (req, res) => {
        res.render("register", {title: "register"})
    })
    router.get("/profile", checkAuthentication, (req, res) => {
        const user = req.user;
        res.render("profile", {title: "profile", user})
    })
    router.get("/logout", checkAuthentication, (req, res) => {
        req.logOut({keepSessionInfo: false}, (err) => {
            if(err) console.log(err);
        });
        res.redirect("/login")
    })
    router.post("/register", redirectIfIsAuth, async (req, res) => {
        try {
            const {fullname: fullName, username, password} = req.body;
            const hashPassword = hashSync(password, 10);
            const user = await userModel.findOne({username})
            if(user) {
                const referrer =  req?.header('Referrer') ?? req.headers.referer;
                req.flash("error", "این نام کاربری قبلا استفاده شده است");
                return res.redirect(referrer ?? "/register")
            }
            await userModel.create({
                fullName, 
                username,
                password: hashPassword
            })
            res.redirect("/login")
        } catch (error) {
            next(error)
        }
    })
    router.post("/login", redirectIfIsAuth, passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }),async (req, res) => {
        res.redirect("/profile")
    })
    return router;
}
module.exports = initRoutes