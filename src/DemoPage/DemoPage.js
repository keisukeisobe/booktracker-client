import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './DemoPage.css'

export default class DemoPage extends Component {
  render() {
    return (
      <div className='demo-page'>
        <h2>Read, Rate, and Review.</h2>
        <Link to='/register'>
          <button className='register-button'>
            Register
          </button>
        </Link>
        <p className='demo-p'>Add books to your library.</p>
        <img className='demo-image' src='./img/AddBook.png' alt='Adding books via BookTracker' width='100%'></img>
        <p className='demo-p'>Track your progress or rate as you go.</p>
        <img className='demo-image' src='./img/EditBook.png' alt='Editing books via BookTracker' width='100%'></img>
        <p className='demo-p'>Generate a user profile and understand your reading tendencies.</p>
        <img className='demo-image' src='./img/Profile.png' alt='View your user profile in BookTracker' width='100%'></img>
        <br />
      </div>
      )
  }
}