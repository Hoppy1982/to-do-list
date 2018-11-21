import React, { Component } from 'react'
import styled from 'styled-components'


class EnterNewTaskToggle extends Component {
  constructor(props) {
    super(props)
    this.toggleEnterNewTasks = this.props.toggleEnterNewTasks
    this.handleToggleEnterNewTasks = this.props.handleToggleEnterNewTasks
  }

  render() {
    return(
      <button className={this.props.className} onClick={this.props.handleToggleEnterNewTasks}>Enter New Task {this.props.toggleEnterNewTasks ? 'on' : 'off'}</button>
    )
  }
}


const StyledEnterNewTaskToggle = styled(EnterNewTaskToggle)`
  border-bottom-right-radius: 0.4em;
`


export default StyledEnterNewTaskToggle
