const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const Donor = require("../models/Donor");
const Campaign = require("../models/Campaign");
const Event = require("../models/Event");
const Donation = require("../models/Donation");
const Task = require("../models/Task");
const isAdmin = require("../middleware/isAdmin");
const isVolunteer = require("../middleware/isVolunteer");
const isDonor = require("../middleware/isDonor");

const path = require('path')
const methodOverride = require('method-override')
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

router.get('/',async(req,res)=>{
  const events=await Event.find();
  const campaigns=await Campaign.find();
  res.render('frontPage',{events,campaigns})
})

router.get('/donate/form',(req,res)=>{
  res.render('donationPage')
})
router.get('/volunteer/form',(req,res)=>{
  res.render('volunteerPage')
})
router.get('/login/form',(req,res)=>{
  res.render('loginPage');
})
router.get('/register',(req,res)=>{
  res.render('signupPage.ejs');
})
router.post('/donate/form',async(req,res)=>{
  const{donorName,email,phone,campaign,amount,paymentMethod,message,createdAt}=req.body;
   await Donation.create({donorName,email,phone,campaign,amount,paymentMethod,message,createdAt})
   .then(()=>{
    res.status(201).send("Donation saved successfully")
   })
   .catch((err)=>{
    res.status(400).send("Error saving Donation"+err.message);
   })


})
router.post('/volunteer/form',async(req,res)=>{
  try{
    const{fullname,email,phone,age,gender,city,skill,availability,motivation,createdAt}=req.body;
   const volunteer=await Volunteer.create({fullname,email,phone,age,gender,city,skill,availability,motivation,createdAt})
    res.redirect("/login/form")
  }
   catch(err){
    res.status(400).send("Error saving volunteer"+err.message);
   }


})
function isLoggedIn(req, res, next) {

    if (req.session.isLoggedIn) {
        return next();
    }

    res.redirect("/login/form");

}

module.exports = isLoggedIn;
router.post("/register", async (req, res) => {

    const { fullname, email, phone, role, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({
        email: email.trim().toLowerCase()
      });

      if (existingUser) {
            return res.send("Email already registered");
        }

    if (password !== confirmPassword) {
        return res.send("Passwords do not match");
    }
     const saltRounds=10;
     const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.create({
        fullname,
        email: email.trim().toLowerCase(),
        phone,
        role,
        password:hashedPassword
    });

    res.redirect("/login/form");
});
router.get("/donorDashboard", async (req, res) => {

    const user = await User.findById(req.session.userId);

    const donations = await Donation.find({
        email: user.email
    });

    const campaigns = await Campaign.find({
        title: {
            $in: donations.map(d => d.campaign)
        }
    });

    const totalAmount = donations.reduce((sum, donation) => {
        return sum + donation.amount;
    }, 0);

    res.render("donorDashboard", {
        user,
        donations,
        campaigns,
        totalAmount
    });

});
router.get('/volunteerDashboard',isVolunteer,async(req,res)=>{
  const campaigns=await Campaign.find();
  const user = await User.findById(req.session.userId);
    const volunteer = await Volunteer.findOne({
        email: user.email
      });
  const donations=await Donation.find();

const tasks = await Task.find({
    volunteer: volunteer._id
})
.populate("campaign");
  const events=await Event.find();
  res.render('volunteerDashboard',{tasks,events,volunteer,donations,user,campaigns});
})
router.post("/login/form", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.send("User not found");
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.send("Wrong Password");
        }

       
        req.session.userId = user._id;
        req.session.role = user.role;
        req.session.fullname = user.fullname;
        req.session.isLoggedIn = true;

        
        if (user.role === "admin") {
            return res.redirect("/admin");
        }

        
        if (user.role === "volunteer") {

            const volunteer = await Volunteer.findOne({
                email: user.email
            });

            if (!volunteer) {
                return res.send("Volunteer profile not found");
            }

            if (!volunteer.isApproved) {
                return res.send(`
                    <script>
                        alert("Your account is awaiting admin approval!");
                        window.location.href="/";
                    </script>
                `);
            }

            return res.redirect("/volunteerDashboard");
        }

       
        return res.redirect("/donorDashboard");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
 router.get("/mytasks", isVolunteer, async (req, res) => {
    try {

        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect("/login/form");
        }

        const volunteer = await Volunteer.findOne({
            email: user.email
        });

        if (!volunteer) {
            return res.send("Volunteer profile not found.");
        }

        const tasks = await Task.find({
            volunteer: volunteer._id
        }).populate("campaign");

        res.render("myTask", { tasks });

    } catch (err) {
        res.status(500).send(err.message);
    }
});
  router.put("/mytask/status/:id",async(req,res)=>{
    try{
       const id=req.params.id;
       const {status}=req.body;
       await Task.findByIdAndUpdate(id,{
         status
       }, { new: true, runValidators: true })
       res.redirect("/mytasks")
    }
    catch(err){
      res.status(500).send("err.message")
    }

  })

  router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
      if (err) {
            return res.send("Logout Failed");
        }
       res.clearCookie('connect.sid');
       res.redirect('/');
    })
  })
  router.get("/volunteerEvents",isVolunteer,async(req,res)=>{
    const events=await Event.find();
    res.render('volunteerEvents',{events})
  })

  router.get("/event/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const event = await Event.findById(id);

        if (!event) {
            return res.send("Event not found");
        }

        res.render("eventDetail", { event });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

  router.put("/profile/update/:id", async (req, res) => {
    try {

        const id = req.params.id;

        const {
            fullname,
            phone,
            age,
            gender,
            city,
            skill,
            availability,
            motivation
        } = req.body;

        await Volunteer.findByIdAndUpdate(
            id,
            {
                fullname,
                phone,
                age,
                gender,
                city,
                skill,
                availability,
                motivation
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.redirect("/profile");

    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get("/success",async(req,res)=>{
  res.render("success")
})
const EventRegistration = require("../models/EventRegistration");

router.get("/event/register/:id", isVolunteer, async (req, res) => {
    try {

        const user = await User.findById(req.session.userId);

        const volunteer = await Volunteer.findOne({
            email: user.email
        });

        const eventId = req.params.id;

        const alreadyRegistered = await EventRegistration.findOne({
            volunteer: volunteer._id,
            event: eventId
        });

        if (alreadyRegistered) {
            return res.send("You have already registered for this event.");
        }

        await EventRegistration.create({
            volunteer: volunteer._id,
            event: eventId
        });

        res.redirect("/event");

    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get("/mydonations", isDonor, async (req, res) => {

    const user = await User.findById(req.session.userId);

    const donations = await Donation.find({
        email: user.email
    });

    res.render("myDonations", { donations });

});

router.get("/mycampaigns", isDonor, async (req, res) => {

    const user = await User.findById(req.session.userId);

    const donations = await Donation.find({
        email: user.email
    });

    const campaignNames = donations.map(d => d.campaign);

    const campaigns = await Campaign.find({
        title: { $in: campaignNames }
    });

    res.render("myCampaigns", { campaigns });

});
router.get("/donorProfile", isDonor, async (req, res) => {

    const user = await User.findById(req.session.userId);

    res.render("donorProfile", { user });

});

router.get("/donor/profile/edit/:id", isDonor, async (req, res) => {

    const user = await User.findById(req.params.id);

    res.render("editDonorProfile", { user });

});
router.put("/donor/profile/update/:id", isDonor, async (req, res) => {

    try {

        const { fullname, phone } = req.body;

        await User.findByIdAndUpdate(
            req.params.id,
            {
                fullname,
                phone
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.redirect("/donorProfile");

    } catch (err) {

        res.status(500).send(err.message);

    }

});

module.exports = router;