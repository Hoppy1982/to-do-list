import React, { Component } from 'react'
import styled from 'styled-components'
import DelButton from './DelButton'


//-----------------------------COMPONENT START--------------------------------//
class TasksView extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.tableName = this.props.tableName
    this.rows = this.props.rows

    this.getData = this.props.getData
  }


  render() {
    console.log('TasksView rendering..')
    if (this.props.rows.length === 0) {
      return(
        <h2>No task data to fetch</h2>
      )
    } else if (this.props.rows.length > 0) {
      return(
        <div className={this.props.className}>

          <h1 className='tasksViewH1'>TasksView Component</h1>

          {this.props.rows.map((row) =>
            <StyledTask
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
//-----------------------------COMPONENT END----------------------------------//



//-----------------------------COMPONENT START--------------------------------//
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

        <StyledEditButton handleClick={this.handleTaskModeToggle} mode={this.state.mode}/>
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
//-----------------------------COMPONENT END----------------------------------//



//-----------------------------COMPONENT START--------------------------------//
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
//-----------------------------COMPONENT END----------------------------------//



//-----------------------------COMPONENT START--------------------------------//
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
            <select value={this.category}>
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
//-----------------------------COMPONENT END----------------------------------//



//-----------------------------COMPONENT START--------------------------------//
class EditButton extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.props.handleClick
    this.state = {}
  }

  render() {
    return(
      <button className={this.props.className} onClick={this.handleClick}>Edit</button>
    )
  }
}

const StyledEditButton = styled(EditButton)`
  width: 100px;
  align-self: flex-end;
  background-color: #f4dc42;
  font-weight: 700;
  text-align: center;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  border: solid black 3px;
  border-bottom: none;
`
//-----------------------------COMPONENT END----------------------------------//






export default StyledTasksView
