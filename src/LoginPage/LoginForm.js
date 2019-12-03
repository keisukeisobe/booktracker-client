import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = {error: null}

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { username, password } = ev.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess(res.user_id)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='login-form'
        onSubmit={this.handleSubmitJwtAuth}
      > 
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginFormUserName'>
          </label>
          <input className='input-username' require='true' name='username' id='LoginFormUserName' placeholder='username'></input> 
        </div>
        <div className='password'>
          <label htmlFor='LoginFormPassword'>
          </label>
          <input className='input-password' require='true' name='password' type='password' id='LoginFormPassword' placeholder='password'></input>
        </div>
        <button className='login-button' type='submit'>Login</button>
      </form>
    )
  }
}