// this file contains our authentication routes

const express = require('express');
const router = express.Router();
const { signup, signin, verifyjwt } = require('./auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verifyjwt', verifyjwt);

module.exports = router;