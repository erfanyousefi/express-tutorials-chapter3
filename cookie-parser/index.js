const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
app.use(cookieParser("20fbbf3cac627dd620d7a874e4711c50fd5499eb"))
app.get("/set-cookie", (req, res) => {
    const d = new Date()
    res.cookie('python', "django", {
        maxAge: 50000,
        expires: new Date(d.getTime() + 50000),
        httpOnly: true,
        signed: true,
        // secure: true,
        sameSite: "none" //lax - strict - none
    });
    res.cookie('nodejs', 'javascript, Typescript')
    res.send("cookie have been saved successfully")
})
app.get("/get-cookie", (req, res) => {
    const cookies = req.cookies;
    const signedCookies = req.signedCookies
    res.send({cookies, signedCookies})
})
app.get("/clear-cookie/:name", (req, res) => {
    res.clearCookie(req.params.name)
    res.send("Cookie has been deleted successfully")
})
app.listen(4000, () => {
    console.log("server run on port 3000");
})