import { Table, Input, Form, Button, Checkbox } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './EditableTable.css'
import { setSelectedRowData, setTableDataFromStorage } from '../../AC/table'

  
  const FormItem = Form.Item
  const EditableContext = React.createContext()
  
  const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form} >
      <tr {...props} />
    </EditableContext.Provider>
  )
  
  const EditableFormRow = Form.create()(EditableRow);
  
  class EditableCell extends React.Component {
    state = {
      editing: false,
    }
  
    toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
    }
  
    save = (e) => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    }
  
    render() {
      const { editing } = this.state;
      const {
        editable,
        dataIndex,
        title,
        record,
        index,
        handleSave,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editable ? (
            <EditableContext.Consumer>
              {(form) => {
                this.form = form;
                return (
                  editing ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `${title} is required.`,
                        }],
                        initialValue: record[dataIndex],
                      })(
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                          onBlur={this.save}
                        />
                      )}
                    </FormItem>
                  ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
                );
              }}
            </EditableContext.Consumer>
          ) : restProps.children}
        </td>
      );
    }
  }
  
  class EditableTable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        role: undefined,
        isArchive: false,
      }
      this.columns = [{
        title: '№',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        align: 'center',
        width: '200px',
      }, {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        editable: true,
        align: 'center',
        width: '200px',
      }, {
        title: 'Дата рождения',
        dataIndex: 'birthday',
        key: 'birthday',
        editable: true,
        align: 'center',
        width: '200px',
      }, {
        title: 'Должность',
        dataIndex: 'role',
        key: 'role',
        align: 'center',
        render: v => <span>
                      <select id="menu1" defaultValue={this.props.selectedRowData[0].role} onChange={this.handleRoleChange}>
                        <option value="cook">Повар</option>
                        <option value="waiter">Официант</option>
                        <option value="driver">Водитель</option>
                      </select>
                    </span>
      }, {
        title: 'В архиве',
        dataIndex: 'isArchive',
        key: 'isArchive',
        align: 'center',
        width: '200px',
        render: v => v === true ? <Checkbox defaultChecked={true}/> : <Checkbox onChange={this.handleIsArchiveChange}/>
      }, {
        title: '',
        dataIndex: 'Action',
        align: 'center',
        render: v => <Button onClick = {this.handleSave}>
                       <Link to = '/'>Сохранить</Link>
                     </Button>
      }]
    }
 
    handleRoleChange = (e) => {
      this.setState({ role: e.target.value })     
    }

    handleIsArchiveChange = () => {
      this.setState({ isArchive: !this.state.isArchive })          
    }

    handleSave = (row) => {
      const newData = [...this.props.selectedRowData];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      item.role = this.state.role
      item.isArchive = this.state.isArchive
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      this.dataSource = newData

      this.props.setSelectedRowData(newData)

      const newStorageData = this.props.tableData.map(rowData => {
          if (rowData.id === newData[0].id) {
            return newData[0];
          }
          return rowData
        }
      )
      this.props.setTableDataFromStorage(newStorageData)
    }
  
    render() {
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      });

      const pagination = { position: 'none' }

      return (
        <div>
          <Table
            rowKey={record => record.id}
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={this.props.selectedRowData}
            columns={columns}
            pagination={pagination}
          />
        </div>
      );
    }
  }
  
  export default connect((state) => {
    return {
        tableData: state.storage.storageData,
        selectedRowData: state.table.selectedRowData,
    }
  }, {setSelectedRowData, setTableDataFromStorage}) (EditableTable);
 