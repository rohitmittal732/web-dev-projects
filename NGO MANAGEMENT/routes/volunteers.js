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


router.get('/volunteers',isVolunteer, async (req, res) => {
  try {
    const volunteers = await Volunteer.find(); 
    res.render('volunteers', { volunteers });
  } catch (err) {
    res.status(500).send("Error fetching volunteers: " + err.message);
  }
});
router.get('/volunteer/new', function (req, res) {
  res.render('addVolunteer')
})
router.post('/volunteer', async (req, res) => {
  try {
    const { fullname, email, phone, age, gender, city, skill, availability, motivation } = req.body;

    
    await Volunteer.create({
      fullname,
      email,
      phone,
      age,
      gender,
      city,
      skill,
      availability,
      motivation,
      isApproved:false
    });

    res.redirect('/volunteers'); 
  } catch (err) {
    res.status(400).send("Error saving volunteer: " + err.message);
  }
});

router.get('/volunteer/approve/:id',isAdmin,async(req,res)=>{
  const id=req.params.id;
  await Volunteer.findByIdAndUpdate(id,{
    isApproved:true,
    status:'Approved'
  })
  res.redirect('/admin')
})

router.get('/volunteer/reject/:id',isAdmin,async(req,res)=>{
  const id =req.params.id;
  await Volunteer.findByIdAndUpdate(id,{
     isApproved:false,
    status:'Rejected'
  })
  res.redirect('/admin')
})

router.get('/volunteer/edit/:id',isAdmin, async (req, res) => {
  try {
    const id = req.params.id; 
    const volunteer = await Volunteer.findById(id);

    if (!volunteer) {
      return res.redirect('/volunteers');
    }

    res.render('editVolunteer', { volunteer });
  } catch (err) {
    res.status(500).send("Error fetching volunteer: " + err.message);
  }
});


router.put('/volunteer/edit/:id', isAdmin,async (req, res) => {
  try {
    await Volunteer.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).redirect('/volunteers');
  } catch (err) {
    res.status(400).send("Error updating volunteer: " + err.message);
  }
});

router.delete('/volunteer/delete/:id',isAdmin, async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/volunteers');
  } catch (err) {
    res.status(500).send("Error deleting volunteer: " + err.message);
  }
});

router.get('/donors',isAdmin, async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).render('donors', { donors });
  } catch (err) {
    res.status(500).send("Error fetching donors: " + err.message);
  }
});

module.exports = router;