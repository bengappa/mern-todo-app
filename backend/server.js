const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

// Bring in Schema
let Todo = require('./todo.model');

// Define Express app - use Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB - needs to be already running
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully")
});

/* Implement the Router and attach Endpoints to the Server with Express
        * todoRoutes is an Express Router Object
        * Below we're attaching each endpoint
*/

// First Endpoint - GET at Default address
todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// Second Endpoint - GET taking a parameter, retrieve one specific record
todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});

// Third Endpoint - Adding HTTP requests to the Database
todoRoutes.route('/add').post(function (req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        })
})

// Fourth Endpoint - Editing existing endpoints, also with a parameter
todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Todo updated');
        })
            .catch(err => {
                res.status(400).send('Update not possible');
            });
    });
});

app.use('/todos', todoRoutes);

// Start Express Server
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});