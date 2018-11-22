import React, { Component } from 'react'
import styled from 'styled-components'
import Task from './Task/Task'


class TasksView extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.tableName = this.props.tableName
    this.rows = this.props.rows

    this.getData = this.props.getData
  }


  render() {
    if (this.props.rows.length === 0) {
      return(
        <h2>No task data to fetch</h2>
      )
    } else if (this.props.rows.length > 0) {
      return(
        <div className={this.props.className}>

          <h1 className='tasksViewH1'>TasksView Component</h1>

          {this.props.rows.map((row) =>
            <Task
              key={row.task_id}
              task_id={row.task_id}
              task_name={row.task_name}
              task_desc={row.task_desc}
              category={row.category}
              priority={row.priority}
              progress={row.progress}
              getData={this.getData}
            />
          )}
        </div>
      )
    }
  }

}

const StyledTasksView = styled(TasksView)`
  width: 96%;
  max-width: 800px;
`


export default StyledTasksView
