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

 In the world of RESTful conventions, the action you taking on a particular record is implied by the HTTP verb you're
 using. If you're POST'ing to /todos/, it is implied that you're making a new record. If you're PUT'ing to /todos/:id,
 it is implied that you're updating the record. This way you keep your URLs clear and standardized and the end user can
 follow the conventions to integrate with you API without needing to guess what the URL structure is.
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
/*
 This should just be POST /todos/
 */
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
/*
 Changed to a PUT /todos/:id to follow convention.
 */
todoRoutes.route('/:id').put((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        /*
         One of the greatest, simplest tricks to cleaning up code in any language it the "early return".
         */
        if (!todo) {
            res.status(404).send('data is not found');
            return;
        }

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
