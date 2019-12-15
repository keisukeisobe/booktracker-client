import React, { Component } from 'react'
import './DemoPage.css'

export default class DemoPage extends Component {
  render() {
    return (
      <div className='demo-page'>
        <h2>Read, Rate, and Review.</h2>
        <p className='demo-p'>Add books to your library.</p>
        <img src='../Images/AddBook.png' alt='Adding books via BookTracker'></img>
        <p className='demo-p'>Track your progress or rate as you go.</p>
        <img src='../Images/EditBook.png' alt='Editing books via BookTracker'></img>
        <p className='demo-p'>Generate a user profile and understand your reading tendencies.</p>
        <img src='../Images/UserProfile.png' alt='View your user profile in BookTracker'></img>
      </div>
      )
  }
}