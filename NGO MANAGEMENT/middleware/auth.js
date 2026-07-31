function isLoggedIn(req, res, next) {

    if (req.session.isLoggedIn) {
        return next();
    }

    res.redirect("/login/form");

}

module.exports = isLoggedIn;