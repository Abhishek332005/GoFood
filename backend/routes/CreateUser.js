

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtSecret = "MYnameis EndtoEndYouTubeChannel$#"



router.post("/createuser", [
  body('email', 'Invalid email').isEmail(),
  body('name', 'Name must be at least 5 characters').isLength({ min: 5 }),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,     // 👈 Add success:false here
      errors: errors.array()
    });
  }

const salt = await bcrypt.genSalt(10);
let secPassword = await bcrypt.hash(req.body.password, salt)

  try {
    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error in createuser:", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});




router.post("/loginuser",  [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,     // 👈 Add success:false here
      errors: errors.array()
    });
  }



let email = req.body.email;
  try {
   let userData =  await User.findOne({email});
    if(!userData){
        return res.status(400).json({errors:"Try logging with correct credentials"})
    }

const pwdCompare = await bcrypt.compare(req.body.password, userData.password)


    if(!pwdCompare){
         return res.status(400).json({errors:"Try logging with correct credentials"})
    }

const data = {
    user:{
        id:userData.id
    }
}
const authToken = jwt.sign(data,jwtSecret)

 return res.json({success:true,authToken:authToken})

  } catch (err) {
    console.error("Error in createuser:", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


module.exports = router;
