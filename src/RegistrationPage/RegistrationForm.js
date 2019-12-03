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
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {this.state.error && <p className='red'>{this.state.error}</p>}
        </div>
        <div className='Username'>
          <label htmlFor='RegistrationFormUsername'>
          </label>
          <input className='Register-Username'
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
          <input className='Register-Email'
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
          <input className='Register-Password'
            name='password'
            type='password'
            required
            placeholder='password'
            id='RegistrationFormPassword'>
          </input>
        </div>
        <button className='Register-Button' type='submit'>
          Register
        </button>
      </form>
    )
  }
}
