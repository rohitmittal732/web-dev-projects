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
const isDonor = require("../middleware/isDonor");

const isAdmin = require("../middleware/isAdmin");
const isVolunteer = require("../middleware/isVolunteer");

router.get('/donors',isDonor, async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).render('donors', { donors });
  } catch (err) {
    res.status(500).send("Error fetching donors: " + err.message);
  }
});
router.get('/donor/new', (req, res) => res.render('addDonor'));

router.post('/donor', async (req, res) => {
  try {
    await Donor.create(req.body);
    res.status(201).redirect('/donors');
  } catch (err) {
    res.status(400).send("Error saving donor: " + err.message);
  }
});

router.get('/donor/edit/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.redirect('/donors');
    res.status(200).render('editDonor', { donor });
  } catch (err) {
    res.status(500).send("Error fetching donor: " + err.message);
  }
});

router.put('/donor/edit/:id', async (req, res) => {
  try {
    await Donor.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).redirect('/donors');
  } catch (err) {
    res.status(400).send("Error updating donor: " + err.message);
  }
});

router.delete('/donor/delete/:id', async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/donors');
  } catch (err) {
    res.status(500).send("Error deleting donor: " + err.message);
  }
});

module.exports = router;