// models/post.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postID: {
    type: Number,
  },
  postText: {
    type: String,
  },
  postAuthor: {
    type: String,
    required: true
  },
  postDate: {    
    type: Date,
    default: Date.now,
    required: true
  },
  postLikes: {
    type: Number,
    default: 0
  },
  postComments: {
    type: String,
  },
  privacy: {
    type: Number,       
    //0 for private 1 for public?
    required: true
  }
});

module.exports = Post = mongoose.model('post', PostSchema);