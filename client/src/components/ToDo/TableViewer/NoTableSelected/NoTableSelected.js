import React, { Component } from 'react'


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


export default NoTableSelected
