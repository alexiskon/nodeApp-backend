const mongoose = require('mongoose');
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    projectName : {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    estimatedTime: String,
    colaborators: String,
    created: {
        type: Date,
        default: Date.now}
})

const Tasks = mongoose.model('Tasks', taskSchema)

module.exports = Tasks