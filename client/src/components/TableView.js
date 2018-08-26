import React, { Component } from 'react'


class TableView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: []
    }
  }
  const BASEURL = `http://localhost:3002/`

  getTableRows() {
    fetch(`${BASEURL}api/table/categories/`)
      .then(res => {
        this.setState({
          rows: res.json()
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return(
      <div>
        {this.state.rows}
      </div>
    )
  }
}


export default TableView
