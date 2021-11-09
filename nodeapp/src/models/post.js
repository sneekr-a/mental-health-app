// models/post.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    // Comments: STORED AS A bcryptjs HASH
    type: String,
    required: true
  },
  joindate: {    
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  streak: {
    type: Number
  },
  points: {
    type: Number
  }
});

module.exports = User = mongoose.model('user', UserSchema);