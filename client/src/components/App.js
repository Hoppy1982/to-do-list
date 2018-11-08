import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import ToDo from './ToDo'
import NotFound from './NotFound'


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="pageContainer">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={ToDo} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;
