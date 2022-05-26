const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the schema
const incubTemp = new Schema({
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


const IncubTemp = mongoose.model('IncubTemp', incubTemp);
module.exports = IncubTemp;
