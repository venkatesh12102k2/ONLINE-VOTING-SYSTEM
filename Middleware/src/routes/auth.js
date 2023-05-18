const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { addAccount } = require("../blockchain/web3-functions");
const User = require("../model/User");
const validateSignupInput = require('../validators/signup');
const validateLoginInput = require('../validators/login');
const { isInternetAvailable, InternetAvailabilityService } = require('is-internet-available');



router.post("/signup", async (req, res) => {
  console.log("test1");
  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    name,
    email,
    mobileNumber,
    password,
    aadharNumber
  } = req.body;

  // Verification to Aadhar Authentication API should take place.
  console.log("test2");
  const dbUser = await User.findOne({
    $or: [
      {
        email
      },
      {
        aadharNumber
      },
      {
        mobileNumber
      }
    ]
  });

  if (dbUser) {
    return res.status(409).send("A user already exists with same email or aadhar number or mobile number");
  }

  //sending verification code to the user email
  //sendVerifyCode(email);
  console.log("test3");
  let newUser = new User({
    name,
    email,
    mobileNumber,
    password,
    aadharNumber
  });
  console.log("test4");
  bcrypt.genSalt(10, (err, salt) => {
    console.log("test5");
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      console.log("test6");
      if (err){
        console.log("test7",newUser);
         throw err;
      }

      newUser.password = hash;
      console.log("test8",hash);
      addAccount(hash).then((val) => {
        console.log("test9",val);
        newUser.accountAddress = val;
        console.log("new usser ",newUser);
        newUser
          .save()
          .then((user) => res.send(user.toJSON()))
      });
    });
  });
});


//login route
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // if (err && err.stack.includes('MongooseServerSelectionError')) {
  //   logger.error(err);
  //   return reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
  // }

  // if (err || info || !user) {
  //   return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  // }
//   isInternetAvailable().then(async(internetConnected = console.log)=>{
//     //gives true when internet available else gives false
//     console.log("internet connected ", internetConnected) 
//     if(internetConnected){

//         //if old user exists, then logout
//         if(app.currentUser){
//             //logout first
//             app.currentUser.logOut()

//             //and then login
//             user = await app.logIn(credentials).catch(err=>{
//                 console.log("err")
//             })
//         }
//         else{
//             //login directly if previous user doesn't exist
//             user = await app.logIn(credentials).catch(err=>{
//                 console.log("err")
//             })
//         }
//     }
// }).catch(err=>{
//     console.log(err)
// })
  return User.findOne({ email: req.body.email }).then((user) => {
    //checking for user
    if (!user) {
      errors.email = "No user found!";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        console.log('inside ismatch');
        //creating jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        console.log("testing auth.js ",keys.secretOrKey);
        //jwt signature
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "1d" },
          (err, token) => {
            res.json(
              "Bearer " + token,
            );
          }
        );
      } else {
        console.log('inside else');
        errors.password = "Incorrect password!";
        return res.status(401).json(errors);
      }
    })
  })
});

console.log('at the end');
module.exports = router;