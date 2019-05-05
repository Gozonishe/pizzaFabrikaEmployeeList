import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import EmployeeEditPage from './components/EmployeeEditPage/EmployeeEditPage'
import EmployeeListPage from './components/EmployeeListPage/EmployeeListPage'
import jsonData from './employees.json'
import { setTableDataFromStorage } from './AC/table'

class App extends Component {
  componentDidMount () {
    this.props.setTableDataFromStorage(jsonData)
  }

  render () {
    return (
      <div className='App'>
        <Router>
          <div>
            <Route exact path='/' component={EmployeeListPage} />
            <Route path='/edit_employee' component={EmployeeEditPage} />
          </div>
        </Router>
      </div>
    )
  }
}

export default connect(null, { setTableDataFromStorage })(App)
