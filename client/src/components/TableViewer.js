import React, { Component } from 'react'
import styled from 'styled-components'


class TableViewer extends Component {
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
    let tableToDisplay
    if (this.state.tableName === '') {
      tableToDisplay = <NoTableSelected />
    } else {
      tableToDisplay = <RenderRawTable tableName={this.state.tableName} rows={this.state.rows}/>
    }

    return(
      <div className={this.props.className}>
        <h1>Raw Table Viewer</h1>
        <StyledTableSelect handleSelect={this.handleTableSelect} value={this.state.tableName}/>
        {tableToDisplay}
      </div>
    )
  }
}


//Sub Components
class RenderRawTable extends Component {
  constructor(props) {
    super(props)
    this.tableName = this.props.tableName
    this.rows = this.props.rows
  }

  render() {
    return(
      <table className={this.props.className}>
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
            </tr>
            )}
        </tbody>
      </table>
    )
  }
}


class NoTableSelected extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <p className={this.props.className}>No table selected</p>
    )
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
      <select className={this.props.className} onChange={this.handleSelect} value={this.props.value}>
        <option value=''>none</option>
        <option value='tasks'>tasks</option>
        <option value='progresses'>progresses</option>
        <option value='categories'>categories</option>
      </select>
    )
  }
}


//styling
const StyledTableViewer = styled(TableViewer)`
  box-sizing: border-box;
  border: solid black 3px;
  width: 96%;
  max-width: 800px;
  margin-top: 0.5em;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
`;


const StyledTableSelect = styled(TableSelect)`
  box-sizing: border-box;
`;


export default StyledTableViewer
