const express = require('express');
const router = express.Router();
const Rack = require('../models/rack');

router.get('/', async (req, res) => {
    const racks = await Rack.find({})
    .populate('containCycles')
    res.send(racks);
})
router.get('/avail-racks', async (req, res) => {
    const racks = await Rack.find({
        // query found from: https://mkyong.com/mongodb/mongodb-find-all-documents-where-an-array-list-size-is-greater-than-n/
        // only return the cycles available to be attached
        currentlyInUse: false
    })
    res.send(racks);
})

router.get('/:rackId',  async(req, res)=>{
    const rack = await Rack.findById(req.params.rackId)
    .populate('containCycles')
    res.send(rack)
})

router.patch('/use-rack/:rackId', async(req, res) => {
    // when a new phase is created, 
    // attach phase to a cycle alr created (in cycle patch)
    // add cycle to rack, only for new cycles
        // but if at farm phase then dont need. (have req.body send in the phaseType)
    // update rack to alr in use

    // api call attach newly created Cycle to the Rack
    
    const { rackId } = req.params
    const { cycleId, phaseType } = req.body
    // console.log(req.body)
    // console.log(rackId)
    if (phaseType == "incubation"){
        const rack = await Rack.findByIdAndUpdate(
            rackId,
            {
                $set: {
                    currentlyInUse: true
                },
                $push: {
                    containCycles: cycleId
                }
            }
        )
        res.send(`modified rackId: ${rack._id}`)
    }
    


    

    
    

})


// router.get('/:userId', async (req, res) => {
//     const user = await User.findById(req.params.id).populate('taskAssigned').populate('taskReceived')
//     res.send(user);
// })



module.exports = router;