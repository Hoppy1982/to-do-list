import React, { Component } from 'react'


class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableName: '',
      rows: []
    }
    this.getTableRows = this.getTableRows.bind(this)
    this.tableSelect = this.tableSelect.bind(this)

    this.BASEURL = `http://localhost:3002/`
  }

  componentDidMount() {
    this.getTableRows('')
  }

  componentDidUpdate() {
    console.log(this.state.rows)
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

    if (tableName !== '') {
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
  }

  tableSelect(event) {
    this.getTableRows(event.target.value)
  }

  render() {
    return(
      <div>
        <select onChange={this.tableSelect}>
          <option value=''>none</option>
          <option value='todo'>todo</option>
          <option value='progresses'>progresses</option>
          <option value='categories'>categories</option>
        </select>

        <table>
          <thead>
            <tr>
              <th colSpan='2'>{this.state.tableName}</th>
            </tr>
            <tr>
              <th>category_id</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row, index) =>
              <tr key={index}>
                <td>{row.category_id}</td>{/*iterate over object (row) keys*/}
                <td>{row.category}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}


export default TableView
