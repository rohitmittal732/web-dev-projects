const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const Donor = require("../models/Donor");
const Campaign = require("../models/Campaign");
const Event = require("../models/Event");
const Donation = require("../models/Donation");

const isAdmin = require("../middleware/isAdmin");
const isVolunteer = require("../middleware/isVolunteer");

const path = require('path')
const methodOverride = require('method-override')
const mongoose=require('mongoose');


router.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).render('donations', { donations });
  } catch (err) {
    res.status(500).send("Error fetching donations: " + err.message);
  }
});

router.get('/donation/new', async (req, res) => {
  try {
    const donors = await Donor.find();
    const campaigns = await Campaign.find();
    res.status(200).render('addDonation', { donors, campaigns });
  } catch (err) {
    res.status(500).send("Error loading donation form: " + err.message);
  }
});

router.post('/donation', async (req, res) => {
  try {
    await Donation.create(req.body);
    res.status(201).redirect('/donations');
  } catch (err) {
    res.status(400).send("Error saving donation: " + err.message);
  }
});

router.delete('/donation/delete/:id', isAdmin,async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/donations');
  } catch (err) {
    res.status(500).send("Error deleting donation: " + err.message);
  }
});

module.exports = router;