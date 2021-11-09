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
    //required: true (not sure if this is required)
  },
  postDate: {    
    type: Date,
    default: Date.now
    //required: true (not sure if this is required)
  },
  privacy: {
    type: Number,       
    //0 for private 1 for public?
    //required: true (not sure if this is required)
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

module.exports = Post = mongoose.model('post', PostSchema);