const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Phase = require('./phase');
// define the schema
const cycleSchema = new Schema({
    cycleDescr: {
        type: String,
        required: true,
    },
    cycleStartDate:{
        type: String,
        required: true,
    },
    cycleEndDate:{
        type: String,
        required: true,
    },
    cycleDuration: {
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        required: true,
    },
    belongsToRack: {
        type: Schema.Types.ObjectId,
        ref: 'Rack'
    },
    containsPhases: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Phase'
        }
    ]
})


const Cycle = mongoose.model('Cycle', cycleSchema);
module.exports = Cycle;
