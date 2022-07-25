const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Cycle = require('../models/cycle');
const Rack = require('../models/rack');

router.get('/', async (req, res) => {
    const cycles = await Cycle.find({}).sort({createdOn: -1})
    
    res.send(cycles);
})
router.get('/avail-cycles', async (req, res) => {
    const cycles = await Cycle.find({
        // query found from: https://mkyong.com/mongodb/mongodb-find-all-documents-where-an-array-list-size-is-greater-than-n/
        // only return the cycles available to be attached
        containPhases : {$exists:true}, $where:'this.containPhases.length == 0'
    })
    res.send(cycles);
})

// add phase to Cycle containPhases array
// also need to say that Cycle belongs to that rack
router.patch('/:cycleId', async(req, res) => {
    const { cycleId } = req.params
    const { phaseId, rackId } = req.body

    console.log(req.body)
    const rack = await Rack.findById(rackId)
    const cycle = await Cycle.findByIdAndUpdate(
        cycleId,
        {
            $set: {
                // belongToRack: rackId,
                cycleStatus: "ongoing",
                belongToRack: rackId
            },
            $push: {
                containPhases: phaseId
            }

        }
    )

    console.log(rackId)
    console.log(cycle.belongToRack)
    res.send(`cycles now belong to rack: ${cycle.belongToRack}`)
})


router.post('/new', async(req, res) => {
    // console.log(req.body)
    console.log(req.body)
    const newCycle = new Cycle(req.body)
    await newCycle.save()
    res.send(newCycle._id)
})



module.exports = router;