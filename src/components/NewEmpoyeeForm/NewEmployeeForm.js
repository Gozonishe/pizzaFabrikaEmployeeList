import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import './NewEmployeeForm.css';
// import { setLocalStorageData } from '../../helpers/localStorageUtils/setData';

const options = [
  { key: 'driver', text: 'Водитель', value: 'driver'},
  { key: 'cook', text: 'Повар', value: 'cook'},
  { key: 'waiter', text: 'Официант', value: 'waiter'},
]

export default class NewEmployeeForm extends Component {
  
  state = {
    name: '',
    phone: '',
    birthday: '',
    role: '',
    isArchive: '',
    submittedName: '',
    submittedPhone: '',
    submittedBirthday: '',
    submittedRole: '',
    submittedisArchive: '',
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, phone, birthday, role, isArchive } = this.state

    let bank = {
      name,
      phone,
      birthday,
      role,
      isArchive,
    }

    // setLocalStorageData(bank, 'myBank')
    //popup confirm
    swal({
      title: "Bank Added!",
      icon: "success",
      button: "Ok!",
    })
    .then (isConfirm => {
      if (isConfirm) {
        this.props.onBankAddCallback(true)
      }
    })
  }

  render() {
    const { name, phone, birthday, role, isArchive } = this.state
    return (
      <div className='newForm'>
        <Form onSubmit={this.handleSubmit} >
          <Form.Group id='formItems'>
            <Form.Input 
              placeholder='Имя' 
              name='name' 
              value={name} 
              onChange={this.handleChange}
              title='Имя Фамилия'
              pattern='([A-Z]{4})[-]{1}([A-Z]{2})[-]{1}([0-9A-Z]{2})[-]{1}([0-9A-Z]{3})' 
              required id='formItem'/> 
            <Form.Input 
              placeholder='Телефон' 
              name='phone'
              value={phone} 
              onChange={this.handleChange} 
              type='text'
              maxLength='14' 
              required
              title='AAAA-AA-AA-AAA'
              pattern='([A-Z]{4})[-]{1}([A-Z]{2})[-]{1}([0-9A-Z]{2})[-]{1}([0-9A-Z]{3})' id='formItem'/>
            <Form.Input 
              placeholder='Дата рождения' 
              name='birthday'
              type='text'
              maxLength='12' 
              value={birthday} 
              onChange={this.handleChange}
              title='AAAA-AA-AA-AAA'
              pattern='([A-Z]{4})[-]{1}([A-Z]{2})[-]{1}([0-9A-Z]{2})[-]{1}([0-9A-Z]{3})' 
              required id='formItem'/>
            <Form.Select
              placeholder='Должность'
              name='role'
              options={options}
              onChange={this.handleChange} 
              required id='formItem'/>
            <Form.Checkbox
              name='isArchive'
              value={isArchive}
              label='В архиве'
              onChange={this.handleChange} 
              id='checkBox'/>
            <Form.Button color='blue' content='Добавить' id='submitButton'/>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
