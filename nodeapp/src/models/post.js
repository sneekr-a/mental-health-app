// models/post.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postID: {
    type: Number,
  },
  postText: {
    type: String,
    //required: true (not sure if this is needed)
  },
  postAuthor: {
    type: String,
    //required: true (not sure if this is required)
  },
  postDate: {    
    type: Date,
    default: Date.now
    //required: true (not sure if this is required)
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
    //required: true (not sure if this is required)
  }
});

module.exports = Post = mongoose.model('post', PostSchema);