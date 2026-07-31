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


router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).render('campaigns', { campaigns });
  } catch (err) {
    res.status(500).send("Error fetching campaigns: " + err.message);
  }
});

router.get('/campaign/new', (req, res) => res.render('addCampaign'));

router.post('/campaign', async (req, res) => {
  try {
    await Campaign.create(req.body);
    res.status(201).redirect('/campaigns');
  } catch (err) {
    res.status(400).send("Error saving campaign: " + err.message);
  }
});
router.get('/campaign/edit/:id', isAdmin, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.redirect('/campaigns');
    res.status(200).render('editCampaign', { campaign });
  } catch (err) {
    res.status(500).send("Error fetching campaign: " + err.message);
  }
});

router.put('/campaign/edit/:id',isAdmin, async (req, res) => {
  try {
    await Campaign.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).redirect('/campaigns');
  } catch (err) {
    res.status(400).send("Error updating campaign: " + err.message);
  }
});

router.delete('/campaign/delete/:id',isAdmin, async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/campaigns');
  } catch (err) {
    res.status(500).send("Error deleting campaign: " + err.message);
  }
});

module.exports = router;