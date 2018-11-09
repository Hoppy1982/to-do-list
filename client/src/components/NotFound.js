import React, { Component } from 'react'

/*
function NotFound({location}) {
  return (
    <div>
      <h1>404</h1>
      <h2>path not matched for <code>{location.pathname}</code></h2>
    </div>
  )
}
*/

class NotFound extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className={this.props.className}>
        <h1>404</h1>
        <h2>path not matched for <code>{location.pathname}</code></h2>
      </div>
    )
  }
}


export default NotFound
