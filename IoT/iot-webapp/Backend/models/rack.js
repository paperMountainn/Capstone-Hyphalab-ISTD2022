const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cycle = require('./cycle');
// define the schema
const rackSchema = new Schema({
    locatedIn: {
        type: String,
        required: true,
        enum: ['incubation', 'farming']
    },
    containCycles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cycle',
            
        }
    ]
})


const Rack = mongoose.model('Rack', rackSchema);
module.exports = Rack;
