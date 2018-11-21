import React, { Component } from 'react'
import styled from 'styled-components'

//!!!pull out subComponents into separate files!!!
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
    let componentToDisplay

    if (this.state.tableName === '') {
       componentToDisplay = <NoTableSelected />
    } else {
       componentToDisplay = <StyledRenderRawTable tableName={this.state.tableName} rows={this.state.rows}/>
    }

    return(
      <div className={this.props.className}>
        <div className='tableViewerUpperSection'>
          <h1>Raw Table Viewer</h1>
          <StyledTableSelect handleSelect={this.handleTableSelect} value={this.state.tableName}/>
        </div>
        {componentToDisplay}
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
          <tr className='tHeaderRow'>
            {Object.keys(this.props.rows[0]).map((keyName, keyIndex) =>
               <th className='tColHeader' key={keyIndex}>
                 <p>{keyName}</p>
               </th>
            )}
          </tr>
        </thead>
        <tbody className='tBody'>
          {this.props.rows.map(row =>
            <tr key={row[Object.keys(row)[0]]}>
              {Object.keys(row).map((keyName, keyIndex) =>
                <td className='tCell' key={keyIndex}>{row[keyName]}</td>
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
      <div className={this.props.className}></div>
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


//Styling
const StyledTableViewer = styled(TableViewer)`
  box-sizing: border-box;
  width: 96%;
  max-width: 800px;
  margin-top: 0.5em;

  display: flex;
  flex-direction: column;

  .tableViewerUpperSection {
    border: solid black 3px;
    border-top-left-radius: 0.5em;
    height: 24px;

    display: flex;
    align-items: stretch;
    justify-content: flex-end;
  }

  h1 {
    flex-basis: 600px;
    text-align: center;
    font-size: 16px;
    line-height: 4px;
  }
`


const StyledTableSelect = styled(TableSelect)`
  border-left: solid black 3px;
  border-right: solid black 1px;
  outline:none;
`


const StyledRenderRawTable = styled(RenderRawTable)`
  * {

  }

  border-left: solid black 3px;
  border-right: solid black 3px;
  border-bottom: solid black 3px;
  text-align: center;
  box-sizing: border-box;
  /*border-collapse: collapse;*/

  table-layout: fixed;
  width: 100%;

  .tCell, .tColHeader {

  }

  .tColHeader {

  }

  .tColHeader p {

  }

  @media only screen and (max-width: 640px) {
    .tCell {
      font-size: 0.8em;
    }

    .tColHeader {
      text-align: left;
    }

    @supports (writing-mode: vertical-lr) {
      .tColHeader {
        height: 100px;
      }

      .tHeaderRow {
        box-sizing: border-box;/*css & ie are dog shit, this stops table from not being 100% width with small number of columns*/
        height: 100px;
      }

      .tColHeader p {
        height: 100px;
        writing-mode: vertical-lr;
        margin-left: auto;
        margin-right: auto;
      }
    }
/*
    @supports not (writing-mode: vertical-lr) {
      .tColHeader {
        height: 140px;
      }

      .tColHeader p {
        width: 140px;
        transform-origin: center;
        transform: rotate(90deg);
        margin: auto;
      }
    }
*/
  }
`

export default StyledTableViewer
