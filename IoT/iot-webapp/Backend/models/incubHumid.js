const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the schema
const incubHumid = new Schema({
    data: [
        {
            value:{
                type: Number,
                required: true,
            },
            date:{
                type: String,
                required: true
            }
        }
    ]
})


const IncubHumid = mongoose.model('IncubHumid', incubHumid);
module.exports = IncubHumid;
