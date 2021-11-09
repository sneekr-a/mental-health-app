// models/post.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postText: {
    type: String,
    //required: true (not sure if this is needed)
  },
  postAuthor: {
    // Comments: STORED AS A bcryptjs HASH
    type: String,
    //required: true
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