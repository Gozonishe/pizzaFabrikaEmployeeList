import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import { Table } from 'antd'

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
      width: '240px',
      minWidth: '240px',
      render: text => <Link to={'/edit_employee'}>{text}</Link>,
    }, {
      title: 'Должность',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      // render: v => <span>{v.toString()}</span>
    }, {
      title: 'Номер телефона',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: '200px',
      minWidth: '200px',
    }];

  const pagination = { position: 'none' }
    return ( 
      <div className="ClientEdit" >
        <header>
          <h1 className='pageInfo'>Список работников</h1>
        </header>
          <body className='mainContent'>
            <div id='clientList'>
                <Table 
                  columns={columns}
                  dataSource={this.props.tableData}
                  pagination={pagination}
                  onRow={record => ({onClick: () => this.onRowClickHandler(record)})}
                />
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