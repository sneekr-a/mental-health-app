const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
   createJWT,
} = require("../utils/auth");
exports.signup = (req, res, next) => {                                                             // sign up auth
  let { name, email, password, password_confirmation } = req.body;
  User.findOne({email: email})
   .then(user=>{
      if(user){                                                                                    // first check if the user exists
         return res.status(422).json({ errors: [{ user: "email already exists" }] });              // if the user exists throw error
      }else {                                                                                      // if the user doesn't then create a new user
         const user = new User({
           email: email,
           name: name,
           password: password,
         });
         bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) { // hash the password before storing
         if (err) throw err;
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
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
}
exports.signin = (req, res) => {                                                                    // sign in auth
     let { email, password } = req.body;
     User.findOne({ email: email }).then(user => {
       if (!user) {                                                                                 // check to see if the user exists
         return res.status(404).json({
           errors: [{ user: "not found" }],                                                         // if not, throw error
         });
       } else {                                                                                     // if they do, compare passwords to verify they match
          bcrypt.compare(password, user.password).then(isMatch => {
             if (!isMatch) {
              return res.status(400).json({ errors: [{ password:
"incorrect" }] 
              });
             }
       let access_token = createJWT(                                                                
         user.email,
         user._id,
         3600
       );
       jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {                       // sign our JWT token
         if (err) {
            res.status(500).json({ erros: err });
         }
         if (decoded) {
             return res.status(200).json({                                                          // send a success token
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