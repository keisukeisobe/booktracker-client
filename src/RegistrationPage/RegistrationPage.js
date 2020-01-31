import React, { Component } from 'react'
import RegistrationForm from './RegistrationForm'
import './RegistrationPage.css'


export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  renderSillyText() {
    let rng = Math.floor(Math.random() * 3) + 1;
    let content;
    if (rng===1){
      content = <p className='silly-text'>What are you reading today?</p>
    } 
    if (rng===2){
      content = <p className='silly-text'>What are you reading today?</p>
    }
    if (rng===3){
      content = <p className='silly-text'>What are you reading today?</p>
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
        <div className='registration-page'>
          <h2 className="register-h2">Register</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </div>
      </>
    )
  }

}