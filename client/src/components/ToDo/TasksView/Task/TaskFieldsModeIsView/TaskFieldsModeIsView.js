import React, { Component } from 'react'
import styled from 'styled-components'


class TaskFieldsModeIsView extends Component {
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
      <div className={this.props.className}>
        <div className='formAreaTop'>Task: {this.props.task_name}</div>
        <div className='formAreaMiddle'>
          <div>id: {this.props.task_id}</div>
          <div>category: {this.props.category}</div>
          <div>progress: {this.props.progress}</div>
          <div>priority: {this.props.priority}</div>
        </div>
        <div className='formAreaBottom'>Description: {this.props.task_desc}</div>
      </div>
    )
  }
}


const StyledTaskFieldsModeIsView = styled(TaskFieldsModeIsView)`
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


export default StyledTaskFieldsModeIsView
