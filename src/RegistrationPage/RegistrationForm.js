import React, { Component } from 'react'
import config from '../config.js'

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
            Username 
          </label>
          <input
            name='username'
            type='text'
            required
            id='RegistrationFormUsername'>
          </input>
        </div>
        <div className='email'>
          <label htmlFor='RegistrationFormEmail'>
            Email 
          </label>
          <input
            name='email'
            type='text'
            required
            id='RegistrationFormEmail'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationFormPassword'>
            Password
          </label>
          <input
            name='password'
            type='password'
            required
            id='RegistrationFormPassword'>
          </input>
        </div>
        <button type='submit'>
          Register
        </button>
      </form>
    )
  }
}
