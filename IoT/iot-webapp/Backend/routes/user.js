const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.id).populate('taskAssigned').populate('taskReceived')
    res.send(user);
})



module.exports = router;