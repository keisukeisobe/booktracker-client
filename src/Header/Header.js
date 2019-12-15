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
      <div className='header-logged-in'>
        <Link className='log-link'
          to={`/users/${this.props.userId}/`}>
          <i className="fas header-logo fa-book fa-3x" ></i>
          <br></br>
          <p className="log-logo-text">My Books</p>
        </Link>
        <Link className='log-link'
          to={`/users/${this.props.userId}/profile`}>
          <i className="fas header-logo fa-user fa-3x"></i>
          <br></br>
          <p className="log-logo-text">My Profile</p>
        </Link>
        <Link className='log-link'
          onClick={this.handleLogoutClick}
          to='/'>
          <i className="fas header-logo fa-sign-out-alt fa-3x"></i>
          <br></br>
          <p className="log-logo-text">Log Out</p>
        </Link>      
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='header-logged-out'>
        <Link className='log-link'
          to='/register'>
          <i className="fas header-logo fa-user-plus fa-3x"></i>
          <br></br>
          <p className='log-logo-text'>Sign Up</p>
        </Link>
        <Link className='log-link'
          to='/login'>
          <i className="fas header-logo fa-sign-in-alt fa-3x"></i>
          <br></br>
          <p className='log-logo-text'>Log In</p>
        </Link>
        <Link className='log-link'
          to='/demo'>
          <i className="fas header-logo fa-info fa-3x"></i>
          <br></br>
          <p className='log-logo-text'>About</p>
        </Link>
      </div>
    )
  }

  renderWelcome() {
    return (
      <>
        <h1 className='header-h1'>
          BookTracker
        </h1>
        <h2 className='header-h2'>
          Welcome!
        </h2>
      </>
    )
  }

  render() {
    return (
      <nav className='banner'>
        {!this.props.loginStatus && this.renderWelcome()}
        {this.props.loginStatus ? this.renderLogoutLink() : this.renderLoginLink()}
      </nav>
    )
  }
}