const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
   createJWT,
} = require("../../../utils/auth");
const config = require('config');
const TOKEN_SECRET = config.get("TOKEN_SECRET");

// sign up auth
exports.signup = (req, res, next) => {                                                                                
   let { username, email, password, password_confirmation } = req.body;
   console.log(req.body);

   let errors = [];

   // if no username exists, push an error
   if (!username) {
      errors.push({ username: "required" });
   }

   // if no email exists, push an error
   if (!email) {
      errors.push({ email: "required" });
   }

   // if no password exists, push an error
   if (!password) {
      errors.push({ password: "required" });
   }

   // if no password_confirmation exists, push an error
   if (!password_confirmation) {
      errors.push({ password_confirmation: "required" });
   }

   // if the password does not match the password_confirmation, push an error
   if (password != password_confirmation) {
      errors.push({ password: "mismatch" });
   }

   // if there is any errors we return those
   if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
   }

   // determine if the user has an email already linked with an account. If not then we create a new User object
   User.findOne({ email: email })
      .then(user => {
         if (user) {
            return res.status(422).json({ errors: [{ user: "email already linked with existing account" }] });
         } else {
            const user = new User({
               username: username,
               password: password,
               email: email
            });

            // hash the password
            bcrypt.genSalt(10, function (err, salt) {
               bcrypt.hash(password, salt, function (err, hash) {
                  user.password = hash;
                  user.save()
                     .then(response => {
                        res.status(200).json({
                           success: true,
                           result: response
                        })
                     })
                     .catch(err => {
                        res.status(500).json({
                           errors: [{ error: err }]
                        });
                     });
               });
            });
         }
      }).catch(err => {
         res.status(500).json({
            errors: [{ error: 'Something went wrong' }]
         });
      })
}

// sign in auth
exports.signin = (req, res) => {
   let { email, password } = req.body;

   // try to find an email for a user. Return error if none found
   User.findOne({ email: email }).then(user => {
      if (!user) {
         return res.status(404).json({
            errors: [{ user: "not found" }],
         });

        // if user email is found we compare password hashes and determine whether or not they match 
      } else {
         bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
               return res.status(400).json({
                  errors: [{ password: "incorrect" }]
               });
            }

            console.log("Creating token...");

            // create a JWT access token
            let access_token = createJWT(
               user.email,
               user._id,
               3600
            );

            console.log("Token created! Verifying token...")

            // verify the generated access token
            jwt.verify(access_token, TOKEN_SECRET, (err, decoded) => {
               if (err) {
                  res.status(500).json({ erros: err });
               }

               console.log("Token verified! Sending response...")

               // if we successfully decode the access token send a success token
               if (decoded) {
                  console.log(user._id);
                  return res.status(200).json({                                                          
                     success: true,
                     token: access_token,
                     userid: user._id
                  });
               }
            });
         }).catch(err => {
            res.status(500).json({ erros: err });
         });
      }
   }).catch(err => {
      res.status(500).json({ erros: err });
   });
}

exports.verifyjwt = (req, res) => {
   let {token} = req.body
   jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if(err){
         res.status(500).json({error: err});
      }
      if(decoded) {
         return res.status(200).json({
            success: true
         })
      }
   })
}