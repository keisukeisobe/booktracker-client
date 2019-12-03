import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import './Header.css'

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
        <Link className='Log-Link'
          to={`/users/${this.props.userId}/`}>
          <i className="fas fa-book fa-3x" ></i>
          <br></br>
          <p className="Log-Logo-Text">My Books</p>
        </Link>
        <Link className='Log-Link'
          to={`/users/${this.props.userId}/profile`}>
          <i className="fas fa-user fa-3x"></i>
          <br></br>
          <p className="Log-Logo-Text">My Profile</p>
        </Link>
        <Link className='Log-Link'
          onClick={this.handleLogoutClick}
          to='/'>
          <i className="fas fa-sign-out-alt fa-3x"></i>
          <br></br>
          <p className="Log-Logo-Text">Log Out</p>
        </Link>      
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='HeaderLoggedOut'>
        <Link className='Log-Link'
          to='/register'>
          <i className="fas fa-user-plus fa-3x"></i>
          <br></br>
          <p className='Log-Logo-Text'>Register</p>
        </Link>
        <Link className='Log-Link'
          to='/login'>
          <i className="fas fa-sign-in-alt fa-3x"></i>
          <br></br>
          <p className='Log-Logo-Text'>Log In</p>
        </Link>
        <Link className='Log-Link'
          to='/demo'>
          <i className="fas fa-question fa-3x"></i>
          <br></br>
          <p className='Log-Logo-Text'>Demo</p>
        </Link>
      </div>
    )
  }

  renderWelcome() {
    return (
      <>
        <h1 className='Header-h1'>
          BookTracker
        </h1>
        <h2 className='Header-h2'>
          Welcome!
        </h2>
      </>
    )
  }

  render() {
    return (
      <nav className='Header'>
        {!this.props.loginStatus && this.renderWelcome()}
        {this.props.loginStatus ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    )
  }
}