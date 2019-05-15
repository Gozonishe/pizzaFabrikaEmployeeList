import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import swal from 'sweetalert'

import './NewEmployeeForm.css'
import InputMask from 'react-input-mask'
import {IMaskInput} from 'react-imask'

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
    isArchive: false,
    submittedName: '',
    submittedPhone: '',
    submittedBirthday: '',
    submittedRole: '',
    submittedisArchive: '',
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleChangeCheckbox = () => {
    this.setState({ isArchive: !this.state.isArchive})
  }

  changeModalState = () => {
    this.setState({ modalState: !this.state.modalState })
  }
  
  handleSubmit = () => {
    const { name, phone, birthday, role, isArchive } = this.state

    let newEmployee = {
      name,
      phone,
      birthday,
      role,
      isArchive,
    }
    swal({
      title: "Новый работник добавлен!",
      icon: "success",
      button: "Ok!",
    })
    .then (isConfirm => {
      if (isConfirm) {
        this.props.onEmployeeAddCallback(newEmployee)
        this.props.changeModalState()
      }
    })
  console.log(newEmployee) 
  }
  render() {
    const { name, phone, birthday, } = this.state
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
              pattern='^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$' 
              required 
              id='formItem'/> 
            <Form.Input 
              placeholder='Телефон' 
              name='phone'
              value={phone} 
              onChange={this.handleChange} 
              type='tel'
              required
              title='+7 (999) 999-9999'
              pattern='^\+[0-9]{1} \([0-9]{3}\) [0-9]{3}[-]{1}[0-9]{4}$' 
              id='formItem'/>
            <Form.Input 
              placeholder='Дата рождения' 
              name='birthday'
              type='date'
              value={birthday} 
              onChange={this.handleChange}
              title='Дата'
              // pattern='([0-9]{2})[.]([0-9]{2})[.]([0-9]{4})' 
              required 
              id='formItem'/>
            <Form.Select
              placeholder='Должность'
              name='role'
              options={options}
              selected='driver'
              onChange={this.handleChange} 
              required 
              id='formItem'/>
            <Form.Checkbox
              name='isArchive'
              type='checkbox'
              label='В архиве'
              onChange={this.handleChangeCheckbox} 
              id='checkBox'/>
            <Form.Button color='blue' content='Добавить' id='submitButton'/>
            <Form.Button color='red' content='Отменить' onClick = {() => {this.props.changeModalState()}} id='submitButton'/>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
