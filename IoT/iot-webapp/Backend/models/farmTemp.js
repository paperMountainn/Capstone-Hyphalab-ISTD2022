const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the schema
const farmTemp = new Schema({
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


const FarmTemp = mongoose.model('FarmTemp', farmTemp);
module.exports = FarmTemp;
