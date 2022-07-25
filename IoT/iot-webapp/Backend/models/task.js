const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true,
    },
    taskDescr: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    completionStatus: {
        type: String,
        required: true,
        enum: ['Completed', 'Incompleted', 'Delayed']
    },
    createdOn:{
        type: Date,
        default: new Date()
    },
    dateDue: {
        type: String
    }
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
