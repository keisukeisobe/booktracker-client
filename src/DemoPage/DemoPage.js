import React, { Component } from 'react'
import './DemoPage.css'

export default class DemoPage extends Component {
  render() {
    return (
      <div className='demo-page'>
        <h2>Demo this app</h2>
        <p className='demo-p'>Use the username: dunder and password: Password1! to log in as a test user and try various features of this app.</p>
      </div>
      )
  }
}