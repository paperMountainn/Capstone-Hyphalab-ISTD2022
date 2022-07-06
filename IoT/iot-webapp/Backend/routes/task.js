const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/user');

router.get('/', async (req, res) => {
    const tasks = await Task.find({}).populate('assignedTo');
    res.send(tasks);
})

// find the task that is assigned to him
router.get('/:userId/myTasks', async (req, res) => {
    // const user = await User.findById(req.params.userId).populate('taskReceived')
    const myTasks = await Task.find({
        assignedTo: req.params.userId
    }).populate('assignedBy')
    res.send(myTasks)
})

router.delete('/:userId/:taskId', async(req, res)=>{
    const {userId, taskId} = req.params;
    await Task.findByIdAndDelete(taskId);
})

module.exports = router;