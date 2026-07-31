
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const app = express();

mongoose.connect("mongodb://localhost:27017/ngo")
.then(() => {
    console.log("db is connected");
})
.catch((err) => {
    console.log(err);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: "ngo-secret-key",
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: "mongodb://localhost:27017/ngo"
        }),

        cookie: {
            maxAge: 1000 * 60 * 60 * 24 
        }
    })
);


const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const volunteerRouter = require("./routes/volunteers");
const donorRouter = require("./routes/donors");
const campaignRouter = require("./routes/campaign");
const eventRouter = require("./routes/events");
const donationRouter=require("./routes/donations");

app.use(authRouter);
app.use(adminRouter);
app.use(volunteerRouter);
app.use(donorRouter);
app.use(campaignRouter);
app.use(eventRouter);
app.use(donationRouter);


const User = require("./models/User");

app.use(async (req, res, next) => {

    if (req.session.userId) {

        req.user = await User.findById(req.session.userId);

    }

    next();

});


app.get('/reports', async (req, res) => {
  try {
    const volunteersCount = await Volunteer.countDocuments();
    const donorsCount = await Donor.countDocuments();
    const campaignsCount = await Campaign.countDocuments();
    const donations = await Donation.find();
    let totalDonationsAmount = donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
    res.status(200).render('reports', { volunteersCount, donorsCount, campaignsCount, totalDonationsAmount });
  } catch (err) {
    res.status(500).send("Error generating reports: " + err.message);
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

