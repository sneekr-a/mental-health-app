// models/post.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true
  },
  postContent: {
    type: String,
    required: true
  },
  postAuthor: {
    type: String,
    required: true
  },
  postDate: {    
    type: String,
    required: true
  },
  postLikes: {
    type: Number,
    default: 0
  },
  privacy: {
    type: Number,       
    //0, 1, 2 for private, friends-only, or public
    required: true
  }
});

module.exports = Post = mongoose.model('post', PostSchema);