const jwt = require("jsonwebtoken");
const config = require("config");
const TOKEN_SECRET = config.get("TOKEN_SECRET");
exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, TOKEN_SECRET, {
     expiresIn: duration,
   });
};