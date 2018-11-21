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
      <div className='taskBodyWrapper'>
        <div className='taskName'>Task: {this.task_name}</div>
        <div className='taskAncils'>
          <div>id: {this.task_id}</div>
          <div>category: {this.category}</div>
          <div>progress: {this.progress}</div>
          <div>priority: {this.priority}</div>
        </div>
        <div className='taskDescription'>Description: {this.task_desc}</div>
      </div>
    )
  }
}


export default TaskFieldsModeIsView
