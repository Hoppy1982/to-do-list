import React, { Component } from 'react'
import styled from 'styled-components'


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


const StyledTableSelect = styled(TableSelect)`
  border-left: solid black 3px;
  border-right: solid black 1px;
  outline:none;
`


export default StyledTableSelect
