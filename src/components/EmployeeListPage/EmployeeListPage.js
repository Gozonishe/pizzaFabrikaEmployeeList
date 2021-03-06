import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import { Table, Button } from 'antd'
import { Modal, Image } from 'semantic-ui-react'

import './EmployeeListPage.css'
import { setSelectedRowData, addDataToTheStorage } from '../../AC/table'
import NewEmployeeForm from '../NewEmpoyeeForm/NewEmployeeForm'

class EmployeeListPage extends React.Component {
  state = {
    modalState: false,
  }

  onRowClickHandler = (record) => {
    console.log('selected_row: ', record)
    this.props.setSelectedRowData(record)
  }

  onEmployeeAddCallback = (newEmployeeData) => {
    const lastUniqId = this.props.tableData.map(d=> d.id).sort((a,b)=>a-b).slice(-1)
    newEmployeeData.id = parseInt(lastUniqId) + 1 
    this.props.addDataToTheStorage(newEmployeeData)
  }

  changeModalState = () => {
    this.setState({ modalState: !this.state.modalState })
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
      render: v => { 
        if (v === 'driver') {
          return <span>Водитель</span>
        } else if (v === 'cook') {
          return <span>Повар</span>
        } else {
          return <span>Официант</span>
        }
    },
      filters:[{
        text:'Водитель',
        value:'driver'
      }, {
        text:'Официант',
        value:'waiter'
      }, {
        text:'Повар',
        value:'cook'
      },],
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
          <div className='clientList'>
              <Table 
                rowKey={record => record.id}
                columns={columns}
                dataSource={this.props.tableData}
                pagination={{ pageSize: 50, position: 'none'}}
                scroll={{ y: 600 }}
                onRow={record => ({onClick: () => this.onRowClickHandler(record)})}
              />
              <Modal open={this.state.modalState} trigger={<Button type='primary' id='addEmployee' onClick={this.changeModalState} block>Новый работник</Button>}>
                <Modal.Header>Новый работник</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='../employee1.png' />
                    <Modal.Description>
                        <NewEmployeeForm onEmployeeAddCallback={this.onEmployeeAddCallback} changeModalState={this.changeModalState}/>
                    </Modal.Description>
                </Modal.Content>
              </Modal>
          </div>
      </div>
    );
  }
}
export default connect((state) => {
  return {
    tableData: state.storage.storageData,
  }
}, {setSelectedRowData, addDataToTheStorage}) (EmployeeListPage)