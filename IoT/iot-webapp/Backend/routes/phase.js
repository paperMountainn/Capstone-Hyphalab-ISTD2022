const express = require('express');

const router = express.Router();
const Phase = require('../models/phase');

router.get('/', async (req, res) => {
    const allPhases = await Phase
    .find({})
    .sort({createdOn: -1})
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

router.patch('/:phaseId/update-status', async(req, res)=>{
    const { phaseId } = req.params
    // console.log(phaseId)
    const phase = await Phase.findByIdAndUpdate(
        phaseId,
        {
        $set:{
            status: "completed"
        }
    })
    res.send("updated status of phase to completed")
})

router.post('/new', async(req, res) => {
    // console.log(req.body)
    console.log(req.body)
    const {phaseType} = req.body
    if (phaseType == "incubation"){
        // res.send("creating new incub phase!")
        const newIncubPhase = new Phase(req.body)
        await newIncubPhase.save()
        console.log(`new incub phase created with id: ${newIncubPhase._id}`)
        res.send(newIncubPhase._id)
    }

    else if (phaseType == "farming"){
        const {phaseType, phaseDescription, phaseStartDate, phaseEndDate, status, belongsToRack, belongsToCycle} = req.body
        const newFarmPhase = new Phase(
            {
            phaseType,
            phaseDescription,
            phaseStartDate,
            phaseEndDate,
            status,
            belongsToRack,
            belongsToCycle
        })
        await newFarmPhase.save()
        console.log(`new farm phase created with id: ${newFarmPhase._id}`)
        res.send(newFarmPhase._id)

    }
 
    // const newPhaseId = newPhase._id
    // console.log("hi")
    
})



module.exports = router;