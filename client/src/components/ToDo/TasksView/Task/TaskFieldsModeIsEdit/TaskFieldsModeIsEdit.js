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
      <form className={this.props.className}>

        <div className='formAreaTop'>
          <label>Task:
            <input className='editableTaskField' type='text' defaultValue={' ' + this.task_name}></input>
          </label>
        </div>

        <div className='formAreaMiddle'>
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

        <div className='formAreaBottom'>
          <label>Description:
            <input className='editableTaskField' type='text' defaultValue={' ' + this.task_desc}></input>
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
