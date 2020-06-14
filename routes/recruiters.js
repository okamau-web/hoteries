const express = require("express");
const router = express.Router();
const Recruiter = require("../models/recruiter");

//all recruiters
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const recruiters = await Recruiter.find(searchOptions);
    res.render("recruiters/index", {
      recruiters: recruiters,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/"); 
  }
});

//new recruiter
router.get("/new", (req, res) => {
  res.render("recruiters/new", { recruiter: new Recruiter() });
});

//create recruiter
router.post("/", async (req, res) => {
  const recruiter = new Recruiter({
    name: req.body.name,
  });
  try {
    const newRecruiter = await recruiter.save();
    //res.redirect(`recruiter/${newRecruiter.id}`)
    res.redirect(`recruiters`);
  } catch {
    res.render("recruiter/new", {
      recruiter: recruiter,
      errorMessage: "Error creating Recruiter",
    });
  }
});

module.exports = router;
