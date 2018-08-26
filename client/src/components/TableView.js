import React, { Component } from 'react'


class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      .then(json => {//setState tableName as well
        return json.rows
      })
      .then(rows=> {
        this.setState({rows: rows})
      })
      .catch(err => {
        //console.log(err)
      })
  }

  render() {
    return(
      <table>
        <tbody>
          {this.state.rows.map(row =>
            <tr key={row.category_id}>
              <td>{row.category_id}</td>
              <td>{row.category}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}


export default TableView
