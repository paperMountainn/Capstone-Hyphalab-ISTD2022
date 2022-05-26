const express = require("express");
const app = express();
const port = process.env.PORT || 3001; //Line 3

app.get('/express_backend', (req, res) => {
    res.send('shitty people!');
})
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}, connected to react!`);
})