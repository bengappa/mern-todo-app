import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

// Todo Component - list a table row
/*
 You can use "destructuring" in the function arguments to make this cleaner.

Also used to be:
    const Todo = props => (

 */
const Todo = ({ todo }) => (
    <tr>
        <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_description}</td>
        <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_responsible}</td>
        <td className={todo.todo_completed ? 'completed' : ''}>{todo.todo_priority}</td>
        <td>
            {/* Use "string templating" when interpolating JavaScript values into a string body. */}
            <Link to={`/edit/${todo._id}`}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
            .then(response => this.setState({todos: response.data}))
            .then(error => console.log(error))
    }

    componentDidUpdate() {
        /*
         Don't ever set state in componentDidUpdate, unless you're super sure you know you want to do it there. Setting
         the state triggers an update on your component, which invokes guess which function? componentDidUpdate. So
         it'll create an infinite loop. Uncomment this code and check your network tab in your browser to see what this
         is bad.
         */
         //axios.get('http://localhost:4000/todos')
         //    .then(response => {
         //        this.setState({ todos: response.data })
         //    })
         //    .catch(function (error) {
         //        console.log(error);
         //    })
    }

    /*
     Not necessary. This can be in your render method.
     */
    //todoList() {
    //    return this.state.todos.map(function (currentTodo, i) {
    //        return <Todo todo={currentTodo} key={i} />;
    //    });
    //}

    // Render in JSX
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map((currentTodo, i)  => <Todo todo={currentTodo} key={i} />)}
                    </tbody>
                </table>
            </div>
            )
    }
}
