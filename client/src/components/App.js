import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import styled from 'styled-components'
import ToDo from './ToDo'
import NotFound from './NotFound'


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.className}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={ToDo} />
            <Route path='/test' component={ToDo} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

//styling


export default App;
