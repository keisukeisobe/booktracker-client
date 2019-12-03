import React, { Component } from 'react'
import LoginForm from './LoginForm'
import './LoginPage.css'

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
    this.props.fetchBooks();
    history.push(`/users/${user_id}`)
  }

  renderSillyText() {
    let rng = Math.floor(Math.random() * 3) + 1;
    console.log(rng)
    let content;
    if (rng===1){
      content = <p className='Silly-Text'>What are you reading today?</p>
    } 
    if (rng===2){
      content = <p className='Silly-Text'>What are you reading today?</p>
    }
    if (rng===3){
      content = <p className='Silly-Text'>What are you reading today</p>
    }
    return (
      <>
        {content}
      </>
    )
  }

  render() {
    return (
      <>
        <div className='Login-Page-Form'>
          <h2 className='Login-Header'>Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
        {this.renderSillyText()}
      </>
    )
  }
}