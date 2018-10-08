import React, { Component } from 'react'


class TasksView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableName: '',
      rows: []
    }

    this.BASEURL = `http://localhost:3002/`
  }


  componentDidMount() {
    const OPTIONS = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }

    fetch(`${this.BASEURL}api/todo/`, OPTIONS)
      .then(res => {
        return res.json()
      })
      .then(json => {
        this.setState({
          tableName: json.tableName,
          rows: json.rows
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    if (this.state.rows.length === 0) {
      return(
        <h2>Task data not fetched</h2>
      )
    } else if (this.state.rows.length > 0) {
      return(
        <div>
          <table>
            <thead>
              <tr>
                <th colSpan='2'>{this.state.tableName}</th>
              </tr>
              <tr>
                {Object.keys(this.state.rows[0]).map((keyName, keyIndex) =>
                   <th key={keyIndex}>{keyName}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {this.state.rows.map(row =>
                <tr key={row[Object.keys(row)[0]]}>
                  {Object.keys(row).map((keyName, keyIndex) =>
                    <td key={keyIndex}>{row[keyName]}</td>
                  )}
                  <td><DelButton rowId={row.task_id}/></td>
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
        console.log(`Delete was ${res}`)
        return res
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


export default TasksView
