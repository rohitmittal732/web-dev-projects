const User = require("../models/User");

async function isVolunteer(req, res, next) {

    console.log(req.session);

    if (!req.session.isLoggedIn) {
        return res.redirect("/login/form");
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
        return res.redirect("/login/form");
    }

    if (user.role !== "volunteer" && user.role !== "admin") {
    return res.send("Access Denied");
}

    next();
}

module.exports = isVolunteer;