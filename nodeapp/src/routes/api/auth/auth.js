const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
   createJWT,
} = require("../../../utils/auth");
const config = require('config');
const TOKEN_SECRET = config.get("TOKEN_SECRET");

exports.signup = (req, res, next) => {                                                                                 // sign up auth
   let { username, email, password, password_confirmation } = req.body;
   console.log(req.body);

   let errors = [];

   if (!username) {
      errors.push({ username: "required" });
   }

   if (!email) {
      errors.push({ email: "required" });
   }

   if (!password) {
      errors.push({ password: "required" });
   }

   if (!password_confirmation) {
      errors.push({ password_confirmation: "required" });
   }

   if (password != password_confirmation) {
      errors.push({ password: "mismatch" });
   }

   if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
   }

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

exports.signin = (req, res) => {
   let { email, password } = req.body;

   User.findOne({ email: email }).then(user => {
      if (!user) {
         return res.status(404).json({
            errors: [{ user: "not found" }],
         });
      } else {
         bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
               return res.status(400).json({
                  errors: [{ password: "incorrect" }]
               });
            }

            console.log("Creating token...");
            let access_token = createJWT(
               user.email,
               user._id,
               3600
            );

            console.log("Token created! Verifying token...")

            jwt.verify(access_token, TOKEN_SECRET, (err, decoded) => {
               if (err) {
                  res.status(500).json({ erros: err });
               }

               console.log("Token verified! Sending response...")

               if (decoded) {
                  return res.status(200).json({                                                          // if we successfully decode the access token send a success token
                     success: true,
                     token: access_token,
                     message: user
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