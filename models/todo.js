const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todoData: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Todo", todoSchema);
