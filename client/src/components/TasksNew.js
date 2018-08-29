import React, { Component } from 'react'


class TasksNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEnterNewTasks: false,
      taskName: '',
      taskDesc: '',
      priority: '10',
      progress: '1',
      category: '1'
    }

    this.BASEURL = `http://localhost:3002/`

    this.handleToggleEnterNewTasks = this.handleToggleEnterNewTasks.bind(this)
    this.handleTaskNameInput = this.handleTaskNameInput.bind(this)
    this.handleTaskDescInput = this.handleTaskDescInput.bind(this)
    this.handlePriorityInput = this.handlePriorityInput.bind(this)
    this.handleProgressInput = this.handleProgressInput.bind(this)
    this.handleCategoryInput = this.handleCategoryInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleToggleEnterNewTasks() {
    this.setState(prevState => ({
      toggleEnterNewTasks: !prevState.toggleEnterNewTasks
    }))
  }

  handleTaskDescInput(event) {
    this.setState({taskDesc: event.target.value})
  }

  handleTaskNameInput(event) {
    this.setState({taskName: event.target.value})
  }

  handlePriorityInput(event) {
    this.setState({priority: event.target.value})
  }

  handleProgressInput(event) {
    this.setState({progress: event.target.value})
  }

  handleCategoryInput(event) {
    this.setState({category: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(`New task submitted`)
    for (let prop in this.state) {
      console.log(`${prop}: ${this.state[prop]}`)
    }
    this.postFormData()
  }

  postFormData() {
    const FORM_DATA = {
      todoTask : {
        name: this.state.taskName,
        description: this.state.taskDesc,
        priority: this.state.priority,
        progress: this.state.progress,
        category: this.state.category
      }
    }

    const OPTIONS = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(FORM_DATA)
    }

    fetch(`${this.BASEURL}api/todo/`, OPTIONS)
      .then(res => {
        console.log(res)
      })
  }

  render() {
    if (this.state.toggleEnterNewTasks === false) {
      return(
        <button onClick={this.handleToggleEnterNewTasks}>Enter New Task(s) {this.state.toggleEnterNewTasks ? 'on' : 'off'}</button>
      )
    } else if (this.state.toggleEnterNewTasks === true) {
      return(
        <div>
          <button onClick={this.handleToggleEnterNewTasks}>Enter New Task(s) {this.state.toggleEnterNewTasks ? 'on' : 'off'}</button>

          <form onSubmit={this.handleSubmit}>
            <label>
              Task Name:
              <input type='text' value={this.state.taskName} onChange={this.handleTaskNameInput}/>
            </label>

            <label>
              Task Description:
              <input type='text' value={this.state.taskDesc} onChange={this.handleTaskDescInput}/>
            </label>

            <label>
              Priority:
              <input type='range' min='0' max='20' value={this.state.priority} onChange={this.handlePriorityInput}/>
            </label>

            <label>
              Progress:
              <select value={this.state.progress} onChange={this.handleProgressInput}>
                {/*fetch options from db instead of hard coding*/}
                <option value='1'>not started</option>
                <option value='2'>in progress</option>
                <option value='3'>completed</option>
                <option value='4'>deleted</option>
              </select>
            </label>

            <label>
              Category:
              <select value={this.state.category} onChange={this.handleCategoryInput}>
                {/*fetch options from db instead of hard coding*/}
                <option value='1'>work</option>
                <option value='2'>personal admin</option>
                <option value='3'>food shopping</option>
                <option value='4'>birthdays</option>
              </select>
            </label>

            <input type='submit' value='Submit' />
          </form>
        </div>
      )
    }
  }
}


export default TasksNew
