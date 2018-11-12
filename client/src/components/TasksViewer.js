import React, { Component } from 'react'
import styled from 'styled-components'
import DelButton from './DelButton'


class TasksView extends Component {
  constructor(props) {
    super(props)
    this.tableName = this.props.tableName
    this.rows = this.props.rows
    this.getData = this.props.getData
    this.state = {}
  }


  render() {
    if (this.props.rows.length === 0) {
      return(
        <h2>No task data to fetch</h2>
      )
    } else if (this.props.rows.length > 0) {
      return(
        <div className={this.props.className}>

          <h1>TasksView Component</h1>

          {this.props.rows.map((row) =>
            <div key={row[Object.keys(row)[0]]} className='taskWrapper'>

              <div className='editButton'>Edit</div>

              <div className='taskBodyWrapper'>
                <div className='taskName'>Task: {row.task_name}</div>
                <div className='taskAncils'>
                  <div>id: {row.task_id}</div>
                  <div>category: {row.category}</div>
                  <div>progress: {row.progress}</div>
                  <div>priority: {row.priority}</div>
                </div>
                <div className='taskDescription'>Description: {row.task_desc}</div>
              </div>

              <StyledDelButton rowId={row.task_id} getData={this.getData}/>

            </div>
          )}
        </div>
      )
    }
  }

}


const StyledTasksView = styled(TasksView)`
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  font-family: 'Lato', Fallback, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .taskWrapper {
    width: 96%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    color: #000;
  }

  .editButton {
    width: 100px;
    align-self: flex-end;
    background-color: #f4dc42;
    font-weight: 700;
    text-align: center;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border: solid black 3px;
    border-bottom: none;
  }

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



const StyledDelButton = styled(DelButton)`
  align-self: flex-start;
  border: solid black 3px;
  border-top: none;
`


export default StyledTasksView