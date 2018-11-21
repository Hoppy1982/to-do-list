import React, { Component } from 'react'
import styled from 'styled-components'
import DelButton from './DelButton/DelButton'
import EditButton from './EditButton/EditButton'
import TaskFieldsModeIsView from './TaskFieldsModeIsView/TaskFieldsModeIsView'
import TaskFieldsModeIsEdit from './TaskFieldsModeIsEdit/TaskFieldsModeIsEdit'


class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'view'//toggles between view/edit
    }

    this.task_id = this.props.task_id
    this.task_name = this.props.task_name
    this.task_desc = this.props.task_desc
    this.category = this.props.category
    this.priority = this.props.priority
    this.progress = this.props.progress

    this.getData = this.props.getData

    this.handleTaskModeToggle = this.handleTaskModeToggle.bind(this)
  }


  render() {
    let taskFields

    if (this.state.mode === 'view') {
      taskFields = <TaskFieldsModeIsView
      task_id={this.task_id}
      task_name={this.task_name}
      task_desc={this.task_desc}
      category={this.category}
      priority={this.priority}
      progress={this.progress}
      />
    } else {
      taskFields = <TaskFieldsModeIsEdit
      task_id={this.task_id}
      task_name={this.task_name}
      task_desc={this.task_desc}
      category={this.category}
      priority={this.priority}
      progress={this.progress}
      />
    }

    return(
      <div className={this.props.className}>

        <EditButton handleClick={this.handleTaskModeToggle} mode={this.state.mode}/>
        {taskFields}
        <DelButton rowId={this.task_id} getData={this.getData}/>

      </div>
    )
  }


  handleTaskModeToggle() {
    this.setState(prevState => {
      if (prevState.mode === 'view') {
        return {mode: 'edit'}
      } else {
        return {mode: 'view'}
      }
    })

    console.log(`Edit mode: ${this.state.mode}`)
  }

}

const StyledTask = styled(Task)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  color: #000;


.taskBodyWrapper {
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
}

.taskName {
  text-align: center;
  border-bottom: solid black 3px;
  padding: 0.5em;
}

.taskAncils {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
}

.taskDescription {
  border-top: solid black 3px;
  padding: 0.5em;
}
`


export default StyledTask