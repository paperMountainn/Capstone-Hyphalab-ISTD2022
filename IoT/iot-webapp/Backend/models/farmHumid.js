const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the schema
const farmHumid = new Schema({
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


const FarmHumid = mongoose.model('FarmHumid', farmHumid);
module.exports = FarmHumid;
