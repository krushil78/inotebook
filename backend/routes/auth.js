const express = require("express");
const User = require('../Modals/User');
const router = express.Router();
const { body,  validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var JWT_SECRET = 'jayshreeramramram$';
var fetchuser = require('../middleware/fetchuser');

//route creat a user using : post "api/auth" , desont require auth
router.post("/createuser", [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email','Enter a valid email').isEmail(),
  body('password', 'password must be atlist 6 charachater').isLength({ min: 6 }),
], async (req, res) => {
  let success = false;
  //if threre are error return bad request the errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success , errors: errors.array()});
     }
    // check whether thee email 
    try {
      let user = await User.findOne({email: req.body.email});
    
   if(user){
    let success = false;
      return res.status(400).json({success ,error: 'sorry a user with this email already exists'})
   }
   const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash (req.body.password, salt)
 
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,

   })  //.then(user => res.json(user))
    //.catch(err => {console.log(err);
     // res.json({error:'please enter the unique email', message : err.message})})
     const data ={
      user:{
        id :user.id
       }
     }
   
const authToken = jwt.sign(data, JWT_SECRET);

    // res.json(user);
    let success = true;
     res.json({success , authToken});
  } catch (error) {
    console.error(error.message);
    res.status (500).send("some errar occured")
  }
});


// route 2 create a loginpage for user
router.post("/login", [
  body('email','Enter a valid email').isEmail(),
  body('password', 'password canot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      }

 const {email ,password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      let success = false;
      return res.status(400).json({success,error:"please try to login with carrect creadentials"});

    }
    const passwordcompare =  await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
     let success = false;
      return res.status(400).json({  success ,error:"please try to login with carrect creadentials"});
      
    }
    const data ={
      user:{
        id: user.id
       }
     }
   
  const authToken =  jwt.sign(data, JWT_SECRET);
  let success = true;
  res.json({success, authToken});

  }catch (error){
    console.error(error.message);
    res.status (500).send("internal server error");
  }

});

// route 3 get loggin user detail9s using post 
 router.post("/getuser", fetchuser, async (req, res) =>{
  
try{
  const userId = req.user.id
  const user = await User.findById(userId).select("-password");
  res.send(user);
}
catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});


module.exports = router;
