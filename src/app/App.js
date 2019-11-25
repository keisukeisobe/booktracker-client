import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import config from '../config'
import TokenService from '../services/token-service'
import Header from '../Header/Header'
import LandingPage from '../LandingPage/LandingPage'
import LoginPage from '../LoginPage/LoginPage'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import UserProfile from '../UserProfile/UserProfile'
import UserBook from '../UserBook/UserBook'
import AddBook from '../AddBook/AddBook'

class App extends Component {
  state = {
    error : {},
    books: [],
    userId: '',
    loginStatus: TokenService.hasAuthToken()
  }

  static getStateFromError(error){
    console.error(error);
    return {hasError: true }
  }

  componentDidMount() {
    if(this.state.userId !== '') {
      fetch(`${config.API_ENDPOINT}/users/${this.state.userId}/`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        },
      })
        .then(res => {
          if(!res.ok) {
            return res.json().then(e => Promise.reject(e));
          }
          return res.json();
        })
        .then(books => {
          this.setState( {books} )
        })
    }
  }

  setBooks = (books) => {
    this.setState({books})
  }

  setUserId = (userId) => {
    this.setState({userId})
  }

  setError = (error) => {
    this.setState({error})
  }

  setLoginToken = () => {
    this.setState({loginStatus: TokenService.hasAuthToken()});
  }

  render() {
    return (
      <div className='App'>
        <header className='App-Header'>
          <Header userId={this.state.userId} loginStatus={TokenService.hasAuthToken()} setLoginToken={this.setLoginToken}/>
        </header>
        <main className='App-Main'>
          <Switch>
            <Route exact path={'/'} render={props => (<LandingPage {...props} />) }/>
            <Route exact path={'/login'} render={props => (TokenService.hasAuthToken() ? <LandingPage {...props} />: <LoginPage userId={this.state.userId} setUserId={this.setUserId} {...props}/>)}/>
            <Route exact path={'/register'} render={props => (TokenService.hasAuthToken() ? <LandingPage {...props} />: <RegistrationPage {...props}/>)}/>
            <Route exact path={'/users/:user_id'} render={props => (TokenService.hasAuthToken() ? <UserProfile {...props} books={this.state.books} userId={this.state.userId} setBooks={this.setBooks} setUserId={this.setUserId} setError={this.setError} error={this.state.error}/> : <Redirect to = {'/login'}/> )}/>
            <Route exact path={'/users/:user_id/books/:book_id'} render={props => (TokenService.hasAuthToken() ? <UserBook {...props} books={this.state.books} userId={this.state.userId} setBooks={this.setBooks} setUserId={this.setUserId} setError={this.setError} error={this.state.error}/> : <Redirect to = {'/login'}/>)}/>
            <Route exact path={'/users/:user_id/add-book'} render={props => (TokenService.hasAuthToken() ? <AddBook {...props} books={this.state.books} userId={this.state.userId} setBooks={this.setBooks} setError={this.setEror} error={this.state.error}/> : <Redirect to={'/login'}/>)}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;