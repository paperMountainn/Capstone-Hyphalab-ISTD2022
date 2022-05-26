const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cycle = require('./cycle');
// define the schema
const phaseSchema = new Schema({
    phaseType: {
        type: String,
        required: true,
        enum: ['incubation', 'farming']
    },
    phaseDescription:{
        type: String,
        required: true
    },
    phaseStartDate: {
        type: String,
        required: true,
    },
    phaseEndDate: {
        type: String,
        required: true,
    },
    phaseDuration: {
        type: String
    },
    phaseImgs: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    belongsToCycle: {
        type: Schema.Types.ObjectId,
        ref:'Cycle'
    }

})

const Phase = mongoose.model('Phase', phaseSchema);
module.exports = Phase;