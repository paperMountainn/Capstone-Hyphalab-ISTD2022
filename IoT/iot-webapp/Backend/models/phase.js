const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cycle = require('./cycle');
const Rack = require('./rack');
// define the schema
const phaseSchema = new Schema({
    createdOn:{
        type: Date,
        default: new Date()
    },
    phaseType: {
        type: String,
        required: true,
        enum: ['incubation', 'farming']
    },
    phaseDescription:{
        type: String,
        // required: true
    },
    phaseStartDate: {
        type: Date,
        required: true,
    },
    phaseEndDate: {
        type: Date,
        // required: true,
    },
    phaseDuration: {
        type: Number,

    },
    belongsToCycle: {
        type: Schema.Types.ObjectId,
        ref:'Cycle',
        required: true
    },
    belongsToRack: {
        type: Schema.Types.ObjectId,
        ref:'Rack',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['ongoing', 'completed',]
    }

})

const Phase = mongoose.model('Phase', phaseSchema);
module.exports = Phase;