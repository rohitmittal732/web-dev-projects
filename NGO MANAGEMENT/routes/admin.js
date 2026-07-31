const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const Donor = require("../models/Donor");
const Campaign = require("../models/Campaign");
const Event = require("../models/Event");
const Task = require("../models/Task");
const Donation = require("../models/Donation");

const isAdmin = require("../middleware/isAdmin");
const isVolunteer = require("../middleware/isVolunteer");

const path = require('path')
const methodOverride = require('method-override')
const mongoose=require('mongoose');


router.get("/admin",isAdmin,async (req, res) => {
  try {
    const volunteers = await Volunteer.find({status:"Pending"}).limit(3);
    const donors = await Donor.find();
    const campaigns = await Campaign.find();
    const donations = await Donation.find().limit(4);
    const events=await Event.find().limit(3);
    
    res.render("admin", {
      volunteers,
      donors,
      campaigns,
      donations,
      events,

    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/tasks",isAdmin,async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    const donors = await Donor.find();
    const campaigns = await Campaign.find();
    const donations = await Donation.find();
    const events=await Event.find();
    const tasks = await Task.find()
    .populate("volunteer")
    .populate("campaign");
    
    res.render("Task", {
      volunteers,
      donors,
      campaigns,
      donations,
      events,
      tasks
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.get("/task/new",async(req,res)=>{
  try{
     const volunteers = await Volunteer.find({});
    const donors = await Donor.find();
    const campaigns = await Campaign.find();
    const donations = await Donation.find();
    const events=await Event.find();
    const tasks=await Task.find().populate("volunteer").populate("campaign");
    res.render("assignTask", {
      volunteers,
      donors,
      campaigns,
      donations,
      events,
      tasks
    });
  }
  catch(err){
    res.status(500).send(err.message);
  }
})
router.post("/task/new",async(req,res)=>{
  try{
    const {volunteer,location,campaign,title,deadline,priority,status,description}=req.body;
    await Task.create({volunteer,location,campaign,title,deadline,priority,status,description});
    res.redirect("/tasks");
  }
  catch(err){
     res.status(500).send(err.message);
  }
})
router.get("/profile", isVolunteer, async (req, res) => {

    const user = await User.findById(req.session.userId);

    const volunteer = await Volunteer.findOne({
        email: user.email
    });

    if (!volunteer) {
        return res.send("Volunteer profile not found");
    }

    res.render("editProfile", { volunteer });

});
module.exports = router;