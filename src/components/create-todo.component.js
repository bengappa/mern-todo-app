import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    /*
     With declaring the default state in the body of the class, you get a much cleaner syntax and you don't need a
     constructor. You also can change the notation of your functions to avoid all the binding, which is actually bad to
     do because it means that every time you instantiate the component you create like 4 new functions.
     */

    state = {
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false
    };

    onChangeTodoDescription = (e) => this.setState({ todo_description: e.target.value });

    onChangeTodoResponsible = (e) => this.setState({ todo_responsible: e.target.value });

    onChangeTodoPriority = (e) => this.setState({ todo_priority: e.target.value });

    onChangeTodoCompleted = (e) => this.setState({ todo_completed: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();

        /*
         Nice use of string formatting.
         */
        // Need ` back tics to use ${} syntax below
        console.log(`Form Submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        // Backend logic
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => {
                /*
                 Only reset the state when you're sure the request has succeeded.
                 */
                this.setState({
                    todo_description: '',
                    todo_responsible: '',
                    todo_priority: '',
                    todo_completed: false
                });
                /*
                 Go back to the index when you're done creating the thing
                 */
                this.props.history.push('/');
            });


    };

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create new Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todo_priority === 'Low'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.todo_priority === 'Medium'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.todo_priority === 'High'}
                                onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        )
    }
}
