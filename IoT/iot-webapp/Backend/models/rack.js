const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cycle = require('./cycle');

// define the schema
const rackSchema = new Schema({
    rackName: {
        type: String,
        required: true,
    },
    locatedIn: {
        type: String,
        required: true,
        enum: ['incubation', 'farm', 'null']
    },
    containCycles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cycle',
            
        }
    ],
    currentlyInUse: {
        type: Boolean,
        required: true
    }
})


const Rack = mongoose.model('Rack', rackSchema);
module.exports = Rack;
