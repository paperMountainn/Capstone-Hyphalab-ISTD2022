const express = require("express");
const app = express();
const port = process.env.PORT || 3001; //Line 3
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const phaseRoutes = require('./routes/phase');
const cycleRoutes = require('./routes/cycle');
const rackRoutes = require('./routes/rack');

const morgan = require('morgan');
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
mongoose.set('useFindAndModify', false);
// when you app.use, it runs in every single request
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(morgan('tiny'))

// Routes
app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/phase', phaseRoutes)

app.use('/cycle', cycleRoutes)
app.use('/rack', rackRoutes)

app.get('/home', (req, res) => {
    res.send('hi!');
})


app.all("*", (req, res, next) => {
    // res.send("404!")
    res.send("404 Not found")
})

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}, connected to react!`);
})