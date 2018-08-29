import React, { Component } from 'react'


class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableName: '',
      rows: []
    }
    this.getTableRows = this.getTableRows.bind(this)
    this.handleTableSelect = this.handleTableSelect.bind(this)

    this.BASEURL = `http://localhost:3002/`
  }


  getTableRows(tableName) {
    const OPTIONS = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }

    fetch(`${this.BASEURL}api/table/${tableName}/`, OPTIONS)
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


  handleTableSelect(event) {
    if (event.target.value === '') {
      this.setState({
        rows: [],
        tableName: ''
      })
    } else if (event.target.value !== '') {
      this.getTableRows(event.target.value)
    }
  }


  render() {
    if (this.state.tableName === '') {
      return(
        <TableSelect handleSelect={this.handleTableSelect} value={this.state.tableName}/>
      )
    } else if (this.state.tableName !== '') {
      return(
        <div>
          <TableSelect handleSelect={this.handleTableSelect} value={this.state.tableName}/>
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
                </tr>
                )}
            </tbody>
          </table>
        </div>
      )
    }
  }
}


class TableSelect extends Component {
  constructor(props) {
    super(props)
    this.value = this.props.value
    this.handleSelect = this.props.handleSelect
  }

  render() {
    return(
      <select onChange={this.handleSelect} value={this.props.value}>
        <option value=''>none</option>
        <option value='tasks'>tasks</option>
        <option value='progresses'>progresses</option>
        <option value='categories'>categories</option>
      </select>
    )
  }
}


export default TableView
