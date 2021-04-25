const express = require("express");
const router = express.Router();
const student_profile = require("../models/student_profile");



router.get("/", async (req,res) =>{
    try {
       const student = await student_profile.find();
        res.json({ student });
      } catch (err) {
        res.json({ student: "student not found" });
      }
})

router.get("/:stream", async (req,res) =>{
  try {
     const student = await student_profile.find({"class.stream": req.params.stream});
      res.json({ student });
    } catch (err) {
      res.json({ student: "student not found" });
    }
})

router.get("/:id", async (req,res) =>{
  try {
     const student = await student_profile.find({"email": req.params.id});
      res.json({ student });
    } catch (err) {
      res.json({ student: "student not found" });
    }
})








module.exports = router;