import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import FunctionalComponentExample from './FunctionalComponentExample'
import ClassComponentExample from './ClassComponentExample'


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="pageContainer">
        <FunctionalComponentExample name='Mark' />
        <ClassComponentExample />
      </div>
    )
  }
}


export default App;
