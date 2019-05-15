//
// Mongoose Schema
//

// Define the Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

// After defining the Schema, turn it into a model then export it
module.exports = mongoose.model('Todo', Todo)