const express = require("express");
const router = express.Router();
const Recruiter = require("../models/recruiter");

router.get("/", (req, res) => {
  res.render("recruiters/index");
});

router.get("/new", (req, res) => {
  res.render("recruiters/new", { recruiter: new Recruiter() });
});

router.post("/", async (req, res) => {
  const recruiter = new Recruiter({
    name: req.body.name,
  });
  try {
    const newRecruiter =  await recruiter.save()
    //res.redirect(`recruiter/${newRecruiter.id}`)
        res.redirect(`recruiters`)

  } catch  {
    res.render("recruiter/new", {
           recruiter: recruiter,
             errorMessage: "Error creating Recruiter",
  } )}

});

module.exports = router;
