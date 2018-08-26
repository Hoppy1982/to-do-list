import React, { Component } from 'react'


class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectVal: '',
      tableName: '',
      rows: []
    }
    this.BASEURL = `http://localhost:3002/`
  }

  componentDidMount() {
    this.getTableRows()
  }

  componentDidUpdate() {
    console.log(this.state.rows)
    //this.render()
  }

  getTableRows() {
    const OPTIONS = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }

    fetch(`${this.BASEURL}api/table/categories/`, OPTIONS)
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

  tableSelect(event) {
    this.setState({selectVal: })
  }

  render() {
    return(
      <div>
        <select onChange={this.tableSelect} value={this.state.selectVal}>
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
            {this.state.rows.map(row =>
              <tr key={row.category_id}>
                <td>{row.category_id}</td>
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
