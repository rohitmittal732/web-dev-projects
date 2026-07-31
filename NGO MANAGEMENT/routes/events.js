const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const Donor = require("../models/Donor");
const Campaign = require("../models/Campaign");
const Event = require("../models/Event");
const Donation = require("../models/Donation");

const path = require('path')
const methodOverride = require('method-override')
const mongoose=require('mongoose');

const isAdmin = require("../middleware/isAdmin");
const isVolunteer = require("../middleware/isVolunteer");

router.get('/events',isAdmin, async (req, res) => {
  try {
    const events = await Event.find(); 
    res.render('events', { events });
  } catch (err) {
    res.status(500).send("Error fetching volunteers: " + err.message);
  }
});
router.get('/event/new',isAdmin, function (req, res) {
  res.render('addEvent')
});
router.get('/event/edit/:id',async(req,res)=>{
 try{
   const {id}=req.params;
  const event= await Event.findById(id);
  res.render('editEvent',{event});
 }
 catch(err){
  res.status(400).send("Error",err)
 }
})
router.post('/event',isAdmin, async (req, res) => {
  try {
    const { title, date, location,image } = req.body;
    const event = new Event({ title, date, location ,image});
    await event.save();
    res.redirect('/events')
  } catch (err) {
    res.status(400).send("Error saving event: " + err.message);
  }
});
router.put('/event/edit/:id',isAdmin,async(req,res)=>{
  try{
    const {id}=req.params;
    const {title,date,location,image}=req.body;
    const updated=await Event.findByIdAndUpdate(id,{title,date,location,image});
    res.redirect('/events')
  }
  catch(err){
    res.status(400).send("error is",err)
  }
})
router.delete('/event/delete/:id',isAdmin,async(req,res)=>{
  try{
     const {id}=req.params;
     await Event.findByIdAndDelete(id)
     res.status(200).redirect('/events');
  }
  catch(err){
     res.status(500).send("error in deleting is",)
  }
})

module.exports = router;
