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
    console.log(rng)
    let content;
    if (rng===1){
      content = <p className='Silly-Text'>What are you reading today?</p>
    } 
    if (rng===2){
      content = <p className='Silly-Text'>What are you reading today?</p>
    }
    if (rng===3){
      content = <p className='Silly-Text'>What are you reading today?</p>
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
        <div className='RegistrationPage'>
          <h2 className="Register-h2">Register</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </div>
        {this.renderSillyText()}
      </>
    )
  }

}