// models/User.js

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
  email: {
    type: String,
    required: true
  },
  streak: {
    type: Number
  },
  points: {
    type: Number
  },
  moodData: {
    type: Array
  },
  friendsList: {
    type: Array
  }
});

module.exports = User = mongoose.model('user', UserSchema);
