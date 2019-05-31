import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    state = {
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false
    }

    onChangeTodoResponsible = (e) => this.setState({ todo_responsible: e.target.value });
    onChangeTodoDescription = (e) => this.setState({ todo_description: e.target.value });
    onChangeTodoPriority = (e) => this.setState({ todo_priority: e.target.value });
    onChangeTodoCompleted = (e) => {
        console.log('Hello world from EditTodo');
        console.log(e.target.checked);
        this.setState({ todo_completed: e.target.checked })
    };

    // New Method - after mounting is a good time to request data from the backend
    componentDidMount() {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(response => this.setState(response.data))
            .catch((error) => console.log(error));
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Adding console loggin from create-todo to debug change in completion status
        console.log(`Form Submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        /*
         Switched to PUT request
         */
        axios.put('http://localhost:4000/todos/' + this.props.match.params.id, obj)
            .then(res => this.props.history.push('/'));

    }

    // JSX Output
    render() {
        return (
            <div>
                <h3>Update Todo</h3>
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
                        <div className="form-check">
                            <input type="checkbox"
                                className="form-check-input"
                                id="completedCheckbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}
