import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import swal from 'sweetalert'

import './NewEmployeeForm.css'
import InputMask from 'react-input-mask'

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

  handleChangePhone = e => {
    this.setState({ phone: e.target.value })
  }

  handleChangeBirthday = e => {
    this.setState({ birthday: e.target.value })
  }

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
            <Form.Input>        
              <InputMask
                {...this.props}
                placeholder='Телефон' 
                name='phone'
                id='formItem'
                onChange={this.handleChangePhone}
                value={phone}
                mask="+7\ (999) 999-9999"
                maskChar="_"
              />
            </Form.Input> 
            <Form.Input>
              <InputMask
                {...this.props}
                title='Дата рождения'
                placeholder='Дата рождения' 
                name='birthday'
                id='formItem'
                onChange={this.handleChangeBirthday}
                value={birthday}
                mask="99.99.9999"
                maskChar="_"
              />
            </Form.Input> 
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
