const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Phase = require('./phase');
const Rack = require('./rack');
// define the schema
const cycleSchema = new Schema({
    createdOn:{
        type: Date,
        default: new Date()
    },
    cycleName:{
        type: String, 
        required: true
    },
    cycleDescription: {
        type: String,
        // required: true,
    },
    cycleStartDate:{
        type: String,
        // required: true,
    },
    cycleEndDate:{
        type: String,
        // required: true,
    },
    cycleDuration: {
        type: String,
        // required: true,
    },
    cycleStatus:{
        type: String,
        required: true,
        enum: ['ongoing', 'completed', 'unused']
    },
    belongToRack: {
        type: Schema.Types.ObjectId,
        ref: 'Rack'
    },
    containPhases: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Phase'
        }
    ]
})


const Cycle = mongoose.model('Cycle', cycleSchema);
module.exports = Cycle;
