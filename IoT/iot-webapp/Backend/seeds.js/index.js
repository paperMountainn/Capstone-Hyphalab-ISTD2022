const mongoose = require('mongoose');
const Cycle = require('../models/cycle');
const Phase = require('../models/phase');
const Rack = require('../models/rack');
const User = require('../models/user');
const Task = require('../models/task');
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


const seedDB1 = async() => {
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

// seedDB1();

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
        userType: "Engineer"
    })
    const engineer1 = new User({
        userName: "Benji",
        userType: "Engineer"
    })
    const engineer2 = new User({
        userName: "Steph",
        userType: "Engineer"
    })
    const engineer3 = new User({
        userName: "Sze Jia",
        userType: "Engineer"
    })
    const task1 = new Task({
        taskName: "Move Rack",
        taskDescr: "Please move rack 1.23 to the Farm area",
        completionStatus: "Incompleted",
        dateAssigned:"20/06/2022",
        dateDue:"25/06/2022"
    });
    const task2 = new Task({
        taskName: "Move Contamination",
        taskDescr: "Please move the contaminated samples on rack 2.23 to the sterilisation area.",
        completionStatus: "Incompleted",
        dateAssigned:"20/06/2022",
        dateDue:"25/06/2022"
    });
    const task3 = new Task({
        taskName: "Move Contamination",
        taskDescr: "Please move the contaminated samples on rack 3.23 to the sterilisation area.",
        completionStatus: "Incompleted",
        dateAssigned:"21/06/2022",
        dateDue:"26/06/2022"
    });
    const task4 = new Task({
        taskName: "Move Rack",
        taskDescr: "Please move rack 5.12 to the Farm area",
        completionStatus: "Completed",
        dateAssigned:"10/05/2022",
        dateDue:"15/05/2022"
    });
    const task5 = new Task({
        taskName: "Move Rack",
        taskDescr: "Please move rack 6.12 to the Farm area",
        completionStatus: "Completed",
        dateAssigned:"06/05/2022",
        dateDue:"11/05/2022"
    });
    const task6 = new Task({
        taskName: "Move Rack",
        taskDescr: "Please move rack 7.23 to the Farm area",
        completionStatus: "Completed",
        dateAssigned:"03/05/2022",
        dateDue:"08/05/2022"
    });

    task1.assignedTo = operator1;
    task2.assignedTo = operator1;
    task3.assignedTo = operator1;
    task4.assignedTo = operator1;
    task5.assignedTo = operator1;
    task6.assignedTo = operator1;

    task1.assignedBy = engineer1;
    task2.assignedBy = engineer1;
    task3.assignedBy = engineer2;
    task4.assignedBy = engineer3;
    task5.assignedBy = engineer2;
    task6.assignedBy = engineer2;

    engineer1.taskAssigned.push(task1, task2)
    engineer2.taskAssigned.push(task3, task5, task6)
    engineer3.taskAssigned.push(task4)
    operator1.taskReceived.push(task1, task2, task3, task4,task5,task6)

    await task1.save()
    await task2.save()
    await task3.save()
    await task4.save()
    await task5.save()
    await task6.save()
    
    await operator1.save()
    await operator2.save()
    await operator3.save()

    await engineer1.save()
    await engineer2.save()
    await engineer3.save()
    console.log("seeding complete")
}
seedDB2();