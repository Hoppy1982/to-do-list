import React, { Component } from 'react'
import styled from 'styled-components'
import TasksView from './TasksView'
import TasksNew from './TasksNew'
import TableViewer from './TableViewer'


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
        <TableViewer />
        <TasksNew getData={this.getData}/>
        <TasksView tableName ={this.state.tableName} rows={this.state.rows} getData={this.getData}/>
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


const StyledToDo = styled(ToDo)`
  box-sizing: border-box;
  color: #000;
  border: solid grey 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default StyledToDo;
