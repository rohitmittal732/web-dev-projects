function isDonor(req, res, next) {

    if (
        req.session.isLoggedIn &&
        req.session.role === "donor"
    ) {
        return next();
    }

    res.send("Access Denied");

}

module.exports = isDonor;