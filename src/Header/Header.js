import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'

export default class Header extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.props.setLoginStatus()
    this.props.clearState();
  }

  renderLogoutLink() {
    return (
      <div className='HeaderLoggedIn'>
        <Link
          to={`/users/${this.props.userId}/`}>
          My Books
        </Link>
        {' '}
        <Link
          to={`/users/${this.props.userId}/profile`}>
          My Profile
        </Link>
        {' '}
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>      
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='HeaderLoggedOut'>
        <Link
          to='/register'>
          Register
        </Link>
        {' '}
        <Link
          to='/login'>
          Log in
        </Link>
        {' '}
        <Link
          to='/demo'>
            Demo
        </Link>
      </div>
    )
  }

  render() {
    return (
      <nav className='header'>
        <h1>
          Booktracker
        </h1>
        {this.props.loginStatus ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    )
  }
}