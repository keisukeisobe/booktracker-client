import React, { Component } from 'react'
import config from '../config.js'
import './RegistrationForm.css'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = {error: null}
  
  handleSubmit = event => {
    event.preventDefault()
    const { username, password, email } = event.target
    const user = {
      username: username.value,
      password: password.value,
      email: email.value
    }
    fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => (!res.ok) ? res.json().then( e => Promise.reject(e)): res.json())
      .then(user => {
        username.value = ''
        password.value = ''
        email.value = ''
        this.props.onRegistrationSuccess()    
      })
      .catch(res=> {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <form
        className='registration-form'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {this.state.error && <p className='red'>{this.state.error}</p>}
        </div>
        <div className='Username'>
          <label htmlFor='RegistrationFormUsername'>
          </label>
          <input className='register-username'
            name='username'
            type='text'
            required
            placeholder='username'
            id='RegistrationFormUsername'>
          </input>
        </div>
        <div className='Email'>
          <label htmlFor='RegistrationFormEmail'>
          </label>
          <input className='register-email'
            name='email'
            type='email'
            required
            placeholder='email'
            id='RegistrationFormEmail'>
          </input>
        </div>
        <div className='Password'>
          <label htmlFor='RegistrationFormPassword'>
          </label>
          <input className='register-password'
            name='password'
            type='password'
            required
            placeholder='password'
            id='RegistrationFormPassword'>
          </input>
        </div>
        <p className='registration-form-text'>Passwords require 1 uppercase, 1 lowercase, 1 special character, and 1 number.</p>
        <button className='register-button' type='submit'>
          Register
        </button>
      </form>
    )
  }
}
