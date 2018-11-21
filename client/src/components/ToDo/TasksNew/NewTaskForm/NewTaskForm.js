import React, { Component } from 'react'
import styled from 'styled-components'


class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.getData = this.props.getData
    this.state = {
      taskName: '',
      taskDesc: '',
      priority: '10',
      progress: '1',
      category: '1'
    }

    this.BASEURL = `http://localhost:3002/`

    this.handleTaskNameInput = this.handleTaskNameInput.bind(this)
    this.handleTaskDescInput = this.handleTaskDescInput.bind(this)
    this.handlePriorityInput = this.handlePriorityInput.bind(this)
    this.handleProgressInput = this.handleProgressInput.bind(this)
    this.handleCategoryInput = this.handleCategoryInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
        this.props.getData()
      })
  }

  render() {
    return(
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        <div className='formUpper'>
          <label>
            Task Name:
            <input type='text' value={this.state.taskName} onChange={this.handleTaskNameInput}/>
          </label>
          <input type='submit' value='Submit' />
        </div>

        <div className='formMiddle'>
          <label className='taskAncil'>
            Priority:
            <input type='range' min='0' max='20' value={this.state.priority} onChange={this.handlePriorityInput}/>
          </label>

          <label  className='taskAncil'>
            Progress:
            <select value={this.state.progress} onChange={this.handleProgressInput}>
              {/*fetch options from db instead of hard coding*/}
              <option value='1'>not started</option>
              <option value='2'>in progress</option>
              <option value='3'>completed</option>
              <option value='4'>deleted</option>
            </select>
          </label>

          <label  className='taskAncil'>
            Category:
            <select value={this.state.category} onChange={this.handleCategoryInput}>
              {/*fetch options from db instead of hard coding*/}
              <option value='1'>work</option>
              <option value='2'>personal admin</option>
              <option value='3'>food shopping</option>
              <option value='4'>birthdays</option>
            </select>
          </label>
        </div>

        <div className='formLower'>
          <label>
            Task Description:
            <input type='text' value={this.state.taskDesc} onChange={this.handleTaskDescInput}/>
          </label>
        </div>
      </form>
    )
  }
}


const StyledNewTaskForm = styled(NewTaskForm)`
  .formUpper {
    border-top: solid black 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .formMiddle {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    border-top: solid black 3px;
    border-bottom: solid black 3px;
  }

  .formLower {

  }

  .taskAncil {
    margin: 0.5em;
  }
`


export default StyledNewTaskForm
