// routes/api/post.js

const express = require('express');
const router = express.Router();

// Load post model
const Post = require('../../models/post');
const User = require('../../models/user')

// @route GET api/post/test
// @description tests post route
// @access Public
router.get('/test', (req, res) => res.send('post route testing!'));

// @route GET api/posts
// @description Get all posts
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No Posts found' }));
});

// @route GET api/post/:id
// @description Get single post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostsfound: 'No Posts found' }));
});

// @route GET api/post/all/:id
// @description Get all posts under a user
// @access Public
router.get('/all/:id', (req, res) => {
  var posts = [];

  User.findById(req.params.id)
  .then(user => {
    console.log("Good so far..");

    console.log(user.postsAuthored);
    for (id in user.postsAuthored){
      Post.findById(id)
      .then(post => {
        posts.push(post);
      })
    }

    res.status(200).json(posts);
  }).catch(err => {
    console.log(err);
    res.status(500).json({msg: err})
  })
})

// @route GET api/post
// @description add/save post
// @access Public
// TESTED
router.post('/', (req, res) => {
  Post.create(req.body)
    .then(post => {

      // Save the postid to the user
      User.findById(post.postAuthor)
      .then(user => {
        user.postsAuthored.push(post);
        user.save();
      })
      .catch(err => {
        res.status(400).json({error: err});
        console.log(err);
      });
      
      //Success condition
      res.json({msg: "post added successfully"});

    })
    .catch(err => res.status(401).json({ error: err }));
});

// @route GET api/post/:id
// @description Update post
// @access Public
router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(post => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/post/:id
// @description Delete post by id
// @access Public
// TODO : DELETE POSTID FROM USER
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, req.body)
    .then(post => res.json({ mgs: 'post entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such post' }));

  User.findById(post.postAuthor)
  .then(user => {
    user.postsAuthored.delete(post._id);
    user.save();
  })
  .catch(err => res.status(404).json({ error: 'No such post' }));
});

module.exports = router;