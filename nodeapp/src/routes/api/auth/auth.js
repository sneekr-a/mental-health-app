const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
   createJWT,
} = require("../../../utils/auth");

exports.signup = (req, res, next) => {                                                                                 // sign up auth
  let { username, email, password, password_confirmation } = req.body;
  console.log(req.body);

  let errors = [];

  if (!username){
     errors.push({ username: "required" });
  }

  if (!email){
     errors.push({ email: "required" });
  }

  if (!password){
     errors.push({ password: "required"});
  }

  if (!password_confirmation){
     errors.push({ password_confirmation: "required"});
  }

  if (password != password_confirmation){
     errors.push({ password: "mismatch"});
  }

  if (errors.length > 0){
      return res.status(422).json({ errors: errors});
  }

  User.findOne({email: email})
   .then(user=>{
      if(user){                                                                                                        // first check if the user exists
         return res.status(422).json({ errors: [{ user: "email already linked with existing account" }] });            // if the user exists throw error
      }else {                                                                                                          // if the user doesn't then create a new user
         const user = new User({
           username: username,
           password: password,
           email: email
         });

         bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) { // hash the password before storing
         user.password = hash;
         user.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {                                                                       // catch any error with storing the hashed password
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
              return res.status(400).json({ errors: [{ password: "incorrect" }]                    // if password do not match then throw an error 
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