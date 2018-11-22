import React, { Component } from 'react'
import styled from 'styled-components'

//Converting these in the frontend like this sucks as will break if db table fields change
const PROGRESSES = {
  'not started': '1',
  'in progress': '2',
  'completed': '3',
  'deleted': '4'
}

const CATEGORIES = {
  'work': '1',
  'personal admin': '2',
  'food shopping': '3',
  'birthdays': '4'
}


class TaskFieldsModeIsEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskId: '',
      taskName: '',
      taskDesc: '',
      priority: '',
      progress: '',
      category: ''
    }

    this.BASEURL = `http://localhost:3002/`

    this.task_id = this.props.task_id
    this.task_name = this.props.task_name
    this.task_desc = this.props.task_desc
    this.category = this.props.category
    this.priority = this.props.priority
    this.progress = this.props.progress

    this.getData = this.props.getData
    this.taskToViewMode = this.props.taskToViewMode

    this.handleTaskNameInput = this.handleTaskNameInput.bind(this)
    this.handleTaskDescInput = this.handleTaskDescInput.bind(this)
    this.handlePriorityInput = this.handlePriorityInput.bind(this)
    this.handleProgressInput = this.handleProgressInput.bind(this)
    this.handleCategoryInput = this.handleCategoryInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentDidMount() {
    this.setState({
      taskId: this.props.task_id,
      taskName: this.props.task_name,
      taskDesc: this.props.task_desc,
      priority: this.props.priority,
      progress: PROGRESSES[this.props.progress],
      category: CATEGORIES[this.props.category]
    })
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
        id: this.state.taskId,
        name: this.state.taskName,
        description: this.state.taskDesc,
        priority: this.state.priority,
        progress: this.state.progress,
        category: this.state.category
      }
    }

    const OPTIONS = {
      method: 'PUT',
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
        this.props.taskToViewMode()
      })
  }


  render() {
    return(
      <form className={this.props.className} onSubmit={this.handleSubmit}>

        <div className='formAreaTop'>
          <label>Task:
            <input className='editableTaskField' type='text' defaultValue={' ' + this.props.task_name} onChange={this.handleTaskNameInput}></input>
          </label>

          <input type='submit' value='Submit Changes' />
        </div>

        <div className='formAreaMiddle'>
          <div>id: {this.props.task_id}</div>

          <label>
            Category:
            <select defaultValue={this.props.category} onChange={this.handleCategoryInput}>
              {/*fetch options from db instead of hard coding*/}
              <option value='1'>work</option>
              <option value='2'>personal admin</option>
              <option value='3'>food shopping</option>
              <option value='4'>birthdays</option>
            </select>
          </label>

          <label>
            Progress:
            <select defaultValue={this.props.progress} onChange={this.handleProgressInput}>
              {/*fetch options from db instead of hard coding*/}
              <option value='1'>not started</option>
              <option value='2'>in progress</option>
              <option value='3'>completed</option>
              <option value='4'>deleted</option>
            </select>
          </label>

          <label>
            Priority:
            <input type='range' min='0' max='20' defaultValue={this.props.priority} onChange={this.handlePriorityInput}/>
          </label>
        </div>

        <div className='formAreaBottom'>
          <label>Description:
            <input className='editableTaskField' type='text' defaultValue={' ' + this.props.task_desc} onChange={this.handleTaskDescInput}></input>
          </label>
        </div>

      </form>
    )
  }
}


const StyledTaskFieldsModeIsEdit = styled(TaskFieldsModeIsEdit)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: space-between;
  background-color: #5b5b56;
  color: #fff;
  padding: 0px;
  border-top-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  border: solid black 3px;


  .formAreaTop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    border-bottom: solid black 3px;
    padding: 0.5em;
  }

  .formAreaMiddle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
  }

  .formAreaBottom {
    border-top: solid black 3px;
    padding: 0.5em;
  }
`


export default StyledTaskFieldsModeIsEdit
