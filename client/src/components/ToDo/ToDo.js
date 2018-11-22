import React, { Component } from 'react'
import styled from 'styled-components'
import TasksView from './TasksView/TasksView'
import TasksNew from './TasksNew/TasksNew'
import TableViewer from './TableViewer/TableViewer'


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
    console.log('getData called..')

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
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  font-family: 'Lato', Fallback, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  color: #000;
  border: solid black 8px;
  border-top-left-radius: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`


export default StyledToDo;
