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
    this.props.setLoginToken();
  }

  renderLogoutLink() {
    return (
      <div className='HeaderLoggedIn'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
        {' '}
        <Link
          to={`/users/${this.props.userId}/add-book`}>
          Add Book
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='HeaderLoggedOut'>
        <Link
          to='/login'>
          Log in
        </Link>
        {' '}
        <Link
          to='/register'>
          Register
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