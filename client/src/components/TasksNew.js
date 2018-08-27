import React, { Component } from 'react'


class TasksNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: '',
      taskDesc: ''
    }

    this.handleTaskNameInput = this.handleTaskNameInput.bind(this)
    this.handleTaskDescInput = this.handleTaskDescInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTaskDescInput(event) {
    this.setState({taskDesc: event.target.value})
  }

  handleTaskNameInput(event) {
    this.setState({taskName: event.target.value})
  }

  handleSubmit(event) {
    console.log(`New task submitted`)
    console.log(`taskName: ${this.state.taskName}`)
    console.log(`taskDesc: ${this.state.taskDesc}`)
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Task Name:
          <input type='text' value={this.state.taskName} onChange={this.handleTaskNameInput}/>
        </label>
        <label>
          Task Description:
          <input type='text' value={this.state.taskDesc} onChange={this.handleTaskDescInput}/>
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}


export default TasksNew
