const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the schema
const farmCO2 = new Schema({
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


const FarmCO2 = mongoose.model('FarmCO2', farmCO2);
module.exports = farmCO2;
