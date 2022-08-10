const mongoose = require('mongoose');
const Cycle = require('../models/cycle');
const Phase = require('../models/phase');
const Rack = require('../models/rack');
const User = require('../models/user');
const Task = require('../models/task');
// connect to mongoose from Express
mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.4fcsl.mongodb.net/controlled-environment",
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


const seedDB1 = async() => {
    await Phase.deleteMany({});
    await Rack.deleteMany({});
    await Cycle.deleteMany({});

    const rack1 = new Rack({
        rackName: 'Rack_1',
        locatedIn:'incubation',
        currentlyInUse: true
    })
    const rack2 = new Rack({
        rackName: 'Rack_2',
        locatedIn:'farm',
        currentlyInUse: true
    })
    const rack3 = new Rack({
        rackName: 'Rack_3',
        locatedIn:'null',
        currentlyInUse: false
    })
    const rack4 = new Rack({
        rackName: 'Rack_4',
        locatedIn:'null',
        currentlyInUse: false
    })
    const rack5 = new Rack({
        rackName: 'Rack_5',
        locatedIn:'null',
        currentlyInUse: false
    })
    const rack6 = new Rack({
        rackName: 'Rack_6',
        locatedIn:'null',
        currentlyInUse: false
    })
    const rack7 = new Rack({
        rackName: 'Rack_7',
        locatedIn:'null',
        currentlyInUse: false
    })
    const rack8 = new Rack({
        rackName: 'Rack_8',
        locatedIn:'null',
        currentlyInUse: false
    })
    const rack9 = new Rack({
        rackName: 'Rack_9',
        locatedIn:'null',
        currentlyInUse: false
    })
    const rack10 = new Rack({
        rackName: 'Rack_10',
        locatedIn:'null',
        currentlyInUse: false
    })
   

    // var rackq = await Rack.findOne( { rackName: "Rack 2" } ); 
    // console.log(rackq)
    // can use this to get time created, using each entry that you found
    // dateCreated = rackq._id.getTimestamp()
    // let date = ne Date(dateCreated)
    // console.log(date.toString())

    const cycle1 = new Cycle({
        cycleName:"cycle 1",
        cycleDescription: "This is Cycle 1",
        cycleStatus: "completed",
    })
    const cycle2 = new Cycle({
        cycleName:"cycle 2",
        cycleDescription: "This is Cycle 2",
        cycleStatus: "ongoing"
    })
    const cycle3 = new Cycle({
        cycleName:"cycle 3",
        cycleDescription: "This is Cycle 3",
        cycleStatus: "ongoing"
    })
    const cycle4 = new Cycle({
        cycleName:"cycle 4",
        cycleDescription: "This is Cycle 4",
        cycleStatus: "completed"
    })
    const cycle5 = new Cycle({
        cycleName:"cycle 5",
        cycleDescription: "This is Cycle 5",
        cycleStatus: "completed"
    })
    const cycle6 = new Cycle({
        cycleName:"cycle 6",
        cycleDescription: "This is Cycle 6",
        cycleStatus: "unused"
    })
    const cycle7 = new Cycle({
        cycleName:"cycle 7",
        cycleDescription: "This is Cycle 7",
        cycleStatus: "unused"
    })
    const cycle8 = new Cycle({
        cycleName:"cycle 8",
        cycleDescription: "This is Cycle 8",
        cycleStatus: "unused"
    })
    const cycle9 = new Cycle({
        cycleName:"cycle 9",
        cycleDescription: "This is Cycle 9",
        cycleStatus: "unused"
    })

    const phase1 = new Phase({
        phaseType: 'incubation',
        phaseDescription: 'Best incubation',
        phaseStartDate: new Date(2022, 07, 06),
        phaseEndDate: new Date(2022, 07, 20),
        status: "completed"
    })
    const phase2 = new Phase({
        phaseType: 'farming',
        phaseDescription: 'Farming mushrooms',
        phaseStartDate: new Date(2022, 07, 06),
        phaseEndDate: new Date(2022, 07, 20),
        status: "completed"
    })
    const phase3 = new Phase({
        phaseType: 'incubation',
        phaseDescription: 'This is a phase that i just inoculated',
        phaseStartDate: new Date(2022, 07, 06),
        phaseEndDate: new Date(2022, 07, 20),
        status: "ongoing"
    })
    const phase4 = new Phase({
        phaseType: 'incubation',
        phaseDescription: 'Completed already',
        phaseStartDate: new Date(2022, 07, 06),
        phaseEndDate: new Date(2022, 07, 20),
        status: "completed"
    })
    const phase5 = new Phase({
        phaseType: 'farming',
        phaseDescription: 'Ongoing farming',
        phaseStartDate: new Date(2022, 07, 06),
        phaseEndDate: new Date(2022, 07, 20),
        status: "ongoing"
    })
    const phase6 = new Phase({
        phaseType: 'incubation',
        phaseDescription: 'Inoculated long time ago',
        phaseStartDate: new Date(2022, 04, 01),
        phaseEndDate: new Date(2022, 04, 10),
        status: "completed"
    })
    const phase7 = new Phase({
        phaseType: 'farming',
        phaseDescription: 'Farmed long time ago',
        phaseStartDate: new Date(2022,04 , 10),
        phaseEndDate: new Date(2022, 04, 20),
        status: "completed"
    })
    const phase8 = new Phase({
        phaseType: 'incubation',
        phaseDescription: 'Incubated v long time ago',
        phaseStartDate: new Date(2022, 03, 01),
        phaseEndDate: new Date(2022, 03, 10),
        status: "completed"
    })
    const phase9 = new Phase({
        phaseType: 'farming',
        phaseDescription: 'Farmed v long time ago',
        phaseStartDate: new Date(2022, 03, 10),
        phaseEndDate: new Date(2022, 03, 20),
        status: "completed"
    })
    
    cycle1.belongsToRack = rack1
    cycle2.belongsToRack = rack1
    cycle3.belongsToRack = rack2
    cycle4.belongsToRack = rack3
    cycle5.belongsToRack = rack4

    cycle1.containPhases.push(phase1)
    cycle1.containPhases.push(phase2)

    cycle2.containPhases.push(phase3)

    cycle3.containPhases.push(phase4)
    cycle3.containPhases.push(phase5)

    cycle4.containPhases.push(phase6)
    cycle4.containPhases.push(phase7)

    cycle5.containPhases.push(phase8)
    cycle5.containPhases.push(phase9)

    phase1.belongsToCycle = cycle1
    phase2.belongsToCycle = cycle1

    phase3.belongsToCycle = cycle2
    
    phase4.belongsToCycle = cycle3
    phase5.belongsToCycle = cycle3

    phase6.belongsToCycle = cycle4
    phase7.belongsToCycle = cycle4
    
    phase8.belongsToCycle = cycle5
    phase9.belongsToCycle = cycle5

    phase1.belongsToRack = rack1
    phase2.belongsToRack = rack1

    phase3.belongsToRack = rack1

    phase4.belongsToRack = rack2
    phase5.belongsToRack = rack2

    phase6.belongsToRack = rack3
    phase7.belongsToRack = rack3

    phase8.belongsToRack = rack4
    phase9.belongsToRack = rack4

    rack1.containCycles.push(cycle1)
    rack1.containCycles.push(cycle2)

    rack2.containCycles.push(cycle3)

    rack3.containCycles.push(cycle4)
    rack4.containCycles.push(cycle5)

    await cycle1.save()
    await cycle2.save()
    await cycle3.save()
    await cycle4.save()
    await cycle5.save()
    await cycle6.save()
    await cycle7.save()
    await cycle8.save()
    await cycle9.save()
    

    await phase1.save()
    await phase2.save()
    await phase3.save()
    await phase4.save()
    await phase5.save()
    await phase6.save()
    await phase7.save()
    await phase8.save()
    await phase9.save()

    await rack1.save()
    await rack2.save()
    await rack3.save()
    await rack4.save()
    await rack5.save()
    await rack6.save()
    await rack7.save()
    await rack8.save()
    await rack9.save()
    await rack10.save()


    console.log("seeding rack stuffs complete")
}

seedDB1();

const seedDB2 = async() => {
    await User.deleteMany({});
    await Task.deleteMany({});
    const operator1 = new User({
        userName: "Zoe",
        userType: "Operator"
    })
    const operator2 = new User({
        userName: "Anisha",
        userType: "Operator"
    })
    const operator3 = new User({
        userName: "Benjo",
        userType: "Operator"
    })
    const engineer1 = new User({
        userName: "Kelly",
        userType: "Engineer"
    })
    const engineer2 = new User({
        userName: "Steph",
        userType: "Engineer"
    })
    const engineer3 = new User({
        userName: "Sally",
        userType: "Engineer"
    })

    const engineer4 = new User({
        userName: "Sammy",
        userType: "Engineer"
    })
    const operator4 = new User({
        userName: "Benji",
        userType: "Operator"
    })
    const operator5 = new User({
        userName: "Sze Jia",
        userType: "Operator"
    })

    const task1 = new Task({
        taskName: "Move Rack 1",
        taskDescr: "Please move rack 1.23 to the Farm area",
        completionStatus: "Incompleted",
        dateDue: new Date(2022, 08, 20),
    });
    const task2 = new Task({
        taskName: "Move Contamination",
        taskDescr: "Please move the contaminated samples on rack 2.23 to the sterilisation area.",
        completionStatus: "Incompleted",
        dateDue: new Date(2022, 08, 20),
    });
    const task3 = new Task({
        taskName: "Move Contamination",
        taskDescr: "Please move the contaminated samples on rack 3.23 to the sterilisation area.",
        completionStatus: "Incompleted",
        dateDue: new Date(2022, 08, 20),
    });
    const task4 = new Task({
        taskName: "Move Rack",
        taskDescr: "Please move rack 5.12 to the Farm area",
        completionStatus: "Completed",
        dateDue: new Date(2022, 08, 20),
    });
    const task5 = new Task({
        taskName: "Move Rack",
        taskDescr: "Please move rack 6.12 to the Farm area",
        completionStatus: "Completed",
        dateDue: new Date(2022, 08, 20),
    });
    const task6 = new Task({
        taskName: "Move Rack",
        taskDescr: "Please move rack 7.23 to the Farm area",
        completionStatus: "Completed",
        dateDue: new Date(2022, 08, 20),
    });
    const task7 = new Task({
        taskName: "Move Rack",
        taskDescr: "Please move rack 4 to the Incubation area",
        completionStatus: "Incompleted",
        dateDue: new Date(2022, 08, 20),
    });

    task1.assignedTo = operator1;
    task2.assignedTo = operator1;
    task3.assignedTo = operator2;
    task4.assignedTo = operator2;
    task5.assignedTo = operator3;
    task6.assignedTo = operator3;
    task7.assignedTo = operator4;

    task1.assignedBy = engineer1;
    task2.assignedBy = engineer1;
    task3.assignedBy = engineer2;
    task4.assignedBy = engineer3;
    task5.assignedBy = engineer2;
    task6.assignedBy = engineer2;
    task7.assignedBy = engineer2;

    engineer1.taskAssigned.push(task1, task2)
    engineer2.taskAssigned.push(task3, task5, task6)
    engineer3.taskAssigned.push(task4)
    engineer2.taskAssigned.push(task7)

    operator1.taskReceived.push(task1, task2)
    operator2.taskReceived.push(task3, task4)
    operator3.taskReceived.push(task5, task6)
    operator4.taskReceived.push(task7)

    await task1.save()
    await task2.save()
    await task3.save()
    await task4.save()
    await task5.save()
    await task6.save()
    await task7.save()
    
    await operator1.save()
    await operator2.save()
    await operator3.save()
    await operator4.save()
    await operator5.save()

    await engineer1.save()
    await engineer2.save()
    await engineer3.save()
    await engineer4.save()
    console.log("seeding task stuff complete")
}
seedDB2();