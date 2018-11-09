import React, { Component } from 'react'
import styled from 'styled-components'


class TasksView extends Component {
  constructor(props) {
    super(props)
    this.tableName = this.props.tableName
    this.rows = this.props.rows
    this.getData = this.props.getData
    this.state = {
      //tableName: '',
      //rows: []
    }

    //this.BASEURL = `http://localhost:3002/`
    //this.getData = this.getData.bind(this)
  }


  render() {
    if (this.props.rows.length === 0) {
      return(
        <h2>No task data to fetch</h2>
      )
    } else if (this.props.rows.length > 0) {
      return(
        <div className={this.props.className}>
          <table>
            <thead>
              <tr>
                <th colSpan='2'>{this.props.tableName}</th>
              </tr>
              <tr>
                {Object.keys(this.props.rows[0]).map((keyName, keyIndex) =>
                   <th key={keyIndex}>{keyName}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {this.props.rows.map(row =>
                <tr key={row[Object.keys(row)[0]]}>
                  {Object.keys(row).map((keyName, keyIndex) =>
                    <td key={keyIndex}>{row[keyName]}</td>
                  )}
                  <td><DelButton rowId={row.task_id} getData={this.getData}/></td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
      )
    }
  }


}


class DelButton extends Component {
  constructor(props) {
    super(props)
    this.rowId = this.props.rowId
    this.getData = this.props.getData
    this.state = {}
    this.handleDel = this.handleDel.bind(this)
    this.BASEURL = `http://localhost:3002/`
  }

  handleDel(event) {
    console.log(`deleting ${this.rowId}`)
    const delData = {rowId: this.rowId}
    const OPTIONS = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(delData)
    }

    fetch(`${this.BASEURL}api/todo/`, OPTIONS)
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log(json.msg)
        this.getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return(
      <button onClick={this.handleDel}>del</button>
    )
  }
}


const StyledTasksView = styled(TasksView)`
  border: solid #232323 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  table {
    border: solid red 2px;
    width: 100%;
  }
`;


export default StyledTasksView
