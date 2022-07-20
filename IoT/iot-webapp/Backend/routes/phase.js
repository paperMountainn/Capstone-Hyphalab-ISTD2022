const express = require('express');
const router = express.Router();
const Phase = require('../models/phase');

router.get('/', async (req, res) => {
    const allPhases = await Phase
    .find({})
    .populate('belongsToRack')
    .populate('belongsToCycle');
    res.send(allPhases);
})

router.get('/ongoing', async (req, res) => {
    const allPhases = await Phase
        .find({status: "ongoing"})
        .populate('belongsToRack')
        .populate('belongsToCycle');
    res.send(allPhases);
})

router.post('/new', async(req, res) => {
    // console.log(req.body)
    console.log(req.body)
    const newPhase = new Phase(req.body)
    await newPhase.save()
    // const newPhaseId = newPhase._id
    // console.log("hi")
    res.send(newPhase._id)
})



module.exports = router;