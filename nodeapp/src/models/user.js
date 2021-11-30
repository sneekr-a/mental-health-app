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
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  moodData: {
    type: Array,
    default: {}
  },
  friendsList: {
    type: Array,
    default: {}
  },
  postsAuthored: {
    type: Array,
    default: {}
  }
});

module.exports = User = mongoose.model('user', UserSchema);
