import React, { Component } from 'react'
import styled from 'styled-components'


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


export default StyledRenderRawTable
