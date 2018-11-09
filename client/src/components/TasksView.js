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
              <div className='taskName'>{row.task_name}</div>
              <div className='taskAncils'>
                <div>{row.task_id}</div>
                <div>{row.category}</div>
                <div>{row.progress}</div>
                <div>{row.priority}</div>
                <div>Edit</div>
                <DelButton rowId={row.task_id} getData={this.getData}/>
              </div>
              <div className='taskDescription'>{row.task_desc}</div>
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
  border: solid #232323 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .taskWrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: space-between;
    justify-content: space-between;
    width: 96%;
    max-width: 800px;
    background-color: #cecece;
    margin: 1em;
    padding: 0px;
    border-radius: 0.5em;
  }

  .taskName {
    text-align: center;
    border-bottom: solid black 1px;
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
    border-top: solid black 1px;
    padding: 0.5em;
  }
`;


export default StyledTasksView
