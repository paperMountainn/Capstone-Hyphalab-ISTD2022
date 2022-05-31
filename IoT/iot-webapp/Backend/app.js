const express = require("express");
const app = express();
const port = process.env.PORT || 3001; //Line 3

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


app.get('/express_backend', (req, res) => {
    res.send('shitty people!');
})
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}, connected to react!`);
})