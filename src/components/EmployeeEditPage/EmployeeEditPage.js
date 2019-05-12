import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import './EmployeeEditPage.css'
import EditableTable from '../EditableTable/EditableTable'

class EmployeeEditPage extends Component {
  render () {
    return (
      <div className='ClientEdit' >
        <header>
          <h1 className='pageInfo'>Редактировать данные</h1>
        </header>
        <div className='mainContent'>
          <span>
            <EditableTable />
            <Button className='cancelBtn' type='danger' block onClick={this.onCancelHandler}>
              <a href='/'>Отменить все изменения</a>
            </Button>
          </span>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    selectedRowData: state.table.selectedRowData,
  }
})(EmployeeEditPage)
