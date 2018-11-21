import React, { Component } from 'react'
import styled from 'styled-components'


class EditButton extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.props.handleClick
    this.state = {}
  }

  render() {
    return(
      <button className={this.props.className} onClick={this.handleClick}>Edit</button>
    )
  }
}

const StyledEditButton = styled(EditButton)`
  width: 100px;
  align-self: flex-end;
  background-color: #f4dc42;
  font-weight: 700;
  text-align: center;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  border: solid black 3px;
  border-bottom: none;
`


export default StyledEditButton
