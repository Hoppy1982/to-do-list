import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import TasksView from './TasksView'
import TasksNew from './TasksNew'
import TableView from './TableView'


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="pageContainer">
        <TasksView />
        <TasksNew />
        <TableView />
      </div>
    )
  }
}


export default App;
