// routes/api/post.js

const express = require('express');
const router = express.Router();

// Load User model
const user = require('../../models/post');

// @route GET api/user/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('post route testing!'));

// @route GET api/user
// @description Get all users
// @access Public
router.get('/', (req, res) => {
  user.find()
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No Posts found' }));
});

// @route GET api/users/:id
// @description Get single user by id
// @access Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostsfound: 'No Posts found' }));
});

// @route GET api/user
// @description add/save user
// @access Public
router.post('/', (req, res) => {
  User.create(req.body)
    .then(post => res.json({ msg: 'Post added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this post' }));
});

// @route GET api/user/:id
// @description Update user
// @access Public
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(post => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/user/:id
// @description Delete user by id
// @access Public
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(post => res.json({ mgs: 'post entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such post' }));
});

module.exports = router;