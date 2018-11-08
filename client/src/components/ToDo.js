import React, { Component } from 'react'
import styled from 'styled-components'
import TasksView from './TasksView'
import TasksNew from './TasksNew'
import TableView from './TableView'


class ToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableName: '',
      rows: []
    }

    this.BASEURL = `http://localhost:3002/`
    this.getData = this.getData.bind(this)
  }


  componentDidMount() {
    this.getData()
  }


  render() {
    return (
      <div className={this.props.className}>
        <TasksView tableName ={this.state.tableName} rows={this.state.rows} getData={this.getData}/>
        <TasksNew getData={this.getData}/>
        <TableView />
      </div>
    )
  }


  getData() {
    const OPTIONS = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }

    fetch(`${this.BASEURL}api/todo/`, OPTIONS)
      .then(res => {
        return res.json()
      })
      .then(json => {
        this.setState({
          tableName: json.tableName,
          rows: json.rows
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


}

//Styling
const StyledToDo = styled(ToDo)`
  color: green;
  border: solid #23235d 4px;
`;


export default StyledToDo;
