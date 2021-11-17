// routes/api/post.js

const express = require('express');
const router = express.Router();

// Load post model
const user = require('../../models/post');

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

//(not sure if we need this)
// @route GET api/post/:id
// @description Get single post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostsfound: 'No Posts found' }));
});

// @route GET api/post
// @description add/save post
// @access Public
router.post('/', (req, res) => {
  Post.create(req.body)
    .then(post => res.json({ msg: 'Post added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this post' }));
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
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, req.body)
    .then(post => res.json({ mgs: 'post entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such post' }));
});

module.exports = router;