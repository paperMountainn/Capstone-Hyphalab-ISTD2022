const mongoose = require('mongoose');
const Cycle = require('../models/cycle');
const Phase = require('../models/phase');
const Rack = require('../models/rack');
// connect to mongoose from Express
mongoose.connect(
    'mongodb://localhost:27017/controlled-environment', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true 
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const seedDB = async() => {
    await Phase.deleteMany({});
    await Rack.deleteMany({});
    await Cycle.deleteMany({});
    const phase = new Phase({
        phaseType: 'incubation',
        phaseDescription: 'Best incubation 101',
        phaseStartDate: "today",
        phaseEndDate:"tmr",
        phaseDuration: "7 days",
        phaseImgs:[
            {url: "https://source.unsplash.com/collection/483251"},
        ]
    })
    const rack = new Rack({
        locatedIn:'incubation'
    })
    const cycle = new Cycle({
        cycleDescr: "new Cycle created.",
        cycleStartDate: "today",
        cycleEndDate: "tomorrow",
        cycleDuration: "15 days",
        completed: false,
    })

    rack.containCycles.push(cycle);
    cycle.belongToRack = rack;
    cycle.containPhases.push(phase);
    await phase.save();
    await rack.save();
    await cycle.save();
    console.log("seeding complete")
}

seedDB();

