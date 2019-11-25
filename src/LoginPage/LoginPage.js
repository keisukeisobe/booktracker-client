import React, { Component } from 'react'
import LoginForm from './LoginForm'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = (user_id) => {
    const { history } = this.props
    this.props.setUserId(user_id)
    history.push(`/users/${user_id}`)
  }

  render() {
    return (
      <>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </>
    )
  }
}