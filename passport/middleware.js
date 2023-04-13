function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()) return next();
    return res.redirect('/login');
}
function redirectIfIsAuth(req, res, next) {
    if(req.isAuthenticated()) return res.redirect("/profile");
    return next();
}
module.exports = {
    redirectIfIsAuth,
    checkAuthentication
}