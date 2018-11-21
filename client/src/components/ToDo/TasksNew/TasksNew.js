import React, { Component } from 'react'
import styled from 'styled-components'
import NewTaskNotSelected from './NewTaskNotSelected/NewTaskNotSelected'
import NewTaskForm from './NewTaskForm/NewTaskForm'
import EnterNewTaskToggle from './EnterNewTaskToggle/EnterNewTaskToggle'


class TasksNew extends Component {
  constructor(props) {
    super(props)
    this.getData = this.props.getData
    this.state = {
      toggleEnterNewTasks: false,
    }

    this.handleToggleEnterNewTasks = this.handleToggleEnterNewTasks.bind(this)
  }

  handleToggleEnterNewTasks() {
    this.setState(prevState => ({
      toggleEnterNewTasks: !prevState.toggleEnterNewTasks
    }))
  }

  render() {
    let componentToDisplay

    if (this.state.toggleEnterNewTasks === false) {
      componentToDisplay = <NewTaskNotSelected />//maybe replace these with a generic empty component
    } else if (this.state.toggleEnterNewTasks === true) {
      componentToDisplay = <NewTaskForm getData={this.props.getData}/>
    }

    return(
      <div className={this.props.className}>
        <EnterNewTaskToggle toggleEnterNewTasks={this.state.toggleEnterNewTasks} handleToggleEnterNewTasks={this.handleToggleEnterNewTasks}/>
        {componentToDisplay}
      </div>
    )

  }
}


const StyledTasksNew = styled(TasksNew)`
  box-sizing: border-box;
  margin-top: 0.5em;
  border: solid black 3px;
  border-bottom-right-radius: 0.5em;
  width: 96%;
  max-width: 800px;

  display: flex;
  flex-direction: column;
`


export default StyledTasksNew
