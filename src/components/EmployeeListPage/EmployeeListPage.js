import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import { Table, Button } from 'antd'

import './EmployeeListPage.css'
import { setSelectedRowData } from '../../AC/table'

class EmployeeListPage extends React.Component {
  onRowClickHandler = (record) => {
    console.log('selected_row: ', record)
    this.props.setSelectedRowData(record)
  }

  render() {
    if (!this.props.tableData) {
      return null
    }

    const columns = [{
      title: '№',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    }, {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '220px',
      minWidth: '220px',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      render: text => <Link to={'/edit_employee'}>{text}</Link>,
    }, {
      title: 'Должность',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      filters:[{
        text:'driver',
        value:'driver'
      }, {
        text:'waiter',
        value:'waiter'
      }, {
        text:'cook',
        value:'cook'
      }, {
        text: 'archive',
        value: 'archive',
        children: [{
          text: 'Yes',
          value: 'true',
        }, {
          text: 'No',
          value: 'False',
        }],
      }],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    }, {
      title: 'Номер телефона',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: '200px',
      minWidth: '200px',
    }];

    return ( 
      <div className="ClientEdit" >
        <header>
          <h1 className='pageInfo'>Список работников</h1>
        </header>
          <body className='mainContent'>
            <div className='clientList'>
                <Table 
                  columns={columns}
                  dataSource={this.props.tableData}
                  pagination={{ pageSize: 50, position: 'none'}}
                  scroll={{ y: 600 }}
                  onRow={record => ({onClick: () => this.onRowClickHandler(record)})}
                />
                <Button type='primary' id='addEmployee' block>Новый работник</Button>
            </div>
          </body>  
      </div>
    );
  }
}
export default connect((state) => {
  return {
    tableData: state.storage.storageData,
  }
}, {setSelectedRowData}) (EmployeeListPage)