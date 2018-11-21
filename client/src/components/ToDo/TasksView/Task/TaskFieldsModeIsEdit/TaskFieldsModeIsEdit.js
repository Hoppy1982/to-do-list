import React, { Component } from 'react'
import styled from 'styled-components'


class TaskFieldsModeIsEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.task_id = this.props.task_id
    this.task_name = this.props.task_name
    this.task_desc = this.props.task_desc
    this.category = this.props.category
    this.priority = this.props.priority
    this.progress = this.props.progress
  }

  render() {
    return(
      <form className='taskBodyWrapper'>

        <div className='taskName'>
          <label>Task:
            <input className='editableTaskField' type='text' defaultValue={' ' + this.task_name}></input>
          </label>
        </div>

        <div className='taskAncils'>
          <div>id: {this.task_id}</div>

          <label>
            Category:
            <select defaultValue={this.category}>
              {/*fetch options from db instead of hard coding*/}
              <option value='1'>work</option>
              <option value='2'>personal admin</option>
              <option value='3'>food shopping</option>
              <option value='4'>birthdays</option>
            </select>
          </label>

          <label>
            Progress:
            <select defaultValue={this.progress}>
              {/*fetch options from db instead of hard coding*/}
              <option value='1'>not started</option>
              <option value='2'>in progress</option>
              <option value='3'>completed</option>
              <option value='4'>deleted</option>
            </select>
          </label>

          <label>
            Priority:
            <input type='range' min='0' max='20' defaultValue={this.priority}/>
          </label>
        </div>

        <div className='taskDescription'>
          <label>Description:
            <input className='editableTaskField' type='text' defaultValue={' ' + this.task_desc}></input>
          </label>
        </div>

      </form>
    )
  }
}


export default TaskFieldsModeIsEdit
