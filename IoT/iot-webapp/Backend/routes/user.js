const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');

router.get('/', async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

router.get('/operators', async(req, res) => {
    const allOperators = await User.find({
        userType : 'Operator'
    }).populate('taskReceived')
    res.send(allOperators)
})

router.get('/engineers', async(req, res) => {
    const allEngineers = await User.find({
        userType : 'Engineer'
    }).populate('taskAssigned')
    res.send(allEngineers)
    
})

router.patch('/:taskId', async(req, res)=> {
    const {taskId} = req.params;
    const {statusUpdate} = req.body
    
    task = await Task.findByIdAndUpdate(
        taskId,
        {
            $set: {
                completionStatus: statusUpdate
            }
        }
    )

    res.send(`successfuly updated task to ${statusUpdate}`)
    
})

// router.post('/operator/task', async(req, res)=> {
//     const {completionStatus, taskName, taskDescr, assignedBy, assignedTo, dateDue} = req.body
//     const newTask = new Task(req.body)
//     await newTask.save()
//     await newTask.save().then(
//         (res)=> {
//             console.log("hi")
//             const engineer = User.findByIdAndUpdate(
//                 assignedBy,
//                 {
//                     $push: {
//                         taskAssigned: res._id
//                     }
//                 }
//             ).then(()=>{
//                 const user = User.findByIdAndUpdate(
//                     assignedTo,
//                     {
//                         $push: {
//                             taskReceived: res._id
//                         }
//                     }
//                 )
//             }
//             )
            
           
//         }
//     )
//     res.send("complete")
// })


router.post('/task', async(req, res)=> {
    const {taskId, operatorId, engineerId } = req.body
    const operator = await User.findByIdAndUpdate(
        operatorId,
        {
            $push:{
                taskReceived: taskId
            }

        }
    )
    const engineer = await User.findByIdAndUpdate(
        engineerId,
        {
            $push:{
                taskAssigned: taskId
            }
        }
    )
    res.send(`Engineer ${engineer.userName}`)
})

// router.post('/task', async(req, res)=> {
//     const {taskId, operatorId, engineerId } = req.body
//     const operator = await User.findByIdAndUpdate(
//         operatorId,
//         {
//             $push:{
//                 taskReceived: taskId
//             }

//         }
//     )
// })




router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.id).populate('taskAssigned').populate('taskReceived')
    res.send(user);
})



module.exports = router;