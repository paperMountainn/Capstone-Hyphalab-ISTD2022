const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./task');
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['Engineer', 'Operator']
    },
    taskAssigned: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    taskReceived:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]

});

const User = mongoose.model('User', userSchema);
module.exports = User;
