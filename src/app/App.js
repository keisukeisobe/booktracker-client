import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import config from '../config'
import jwtDecode from 'jwt-decode'
import TokenService from '../services/token-service'
import Header from '../Header/Header'
import LandingPage from '../LandingPage/LandingPage'
import LoginPage from '../LoginPage/LoginPage'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import UserBookList from '../UserBookList/UserBookList'
import UserBook from '../UserBook/UserBook'
import AddBook from '../AddBook/AddBook'
import DemoPage from '../DemoPage/DemoPage'
import UserProfile from '../UserProfile/UserProfile'

class App extends Component {
  state = {
    error : {},
    books: [],
    booksLoaded: false,
    userId: '',
    username: '',
    loginStatus: TokenService.hasAuthToken()
  }

  fetchBooks = () => {
    return fetch(`${config.API_ENDPOINT}/users/${this.state.userId}/`, {
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
        const newBooks = books.concat();
        newBooks.sort(function(a, b){
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA < titleB){
            return -1
          }
          if (titleA > titleB){
            return 1
          }
          return 0;
        })
        this.setState( {books: newBooks, booksNumber: newBooks.length, booksLoaded: true})
      })
  }

  componentDidMount() {
    this.setState({userId: jwtDecode(TokenService.getAuthToken()).user_id})
    if (this.state.loginStatus && !this.state.booksLoaded){
      fetch(`${config.API_ENDPOINT}/users/${jwtDecode(TokenService.getAuthToken()).user_id}/`, {
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
          const newBooks = books.concat();
          newBooks.sort(function(a, b){
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA < titleB){
              return -1
            }
            if (titleA > titleB){
              return 1
            }
            return 0;
          })
          this.setState( {books: newBooks})
          this.setState( {booksNumber: newBooks.length})
          this.setState( {booksLoaded: true} )
        })
  
    }
  }

  clearState = () => {
    this.setState({
      error : {},
      books: [],
      booksLoaded: false,
      userId: '',
      username: '',
      loginStatus: false
    })
  }

  setBooks = (books) => {
    this.setState({books: books})
  }

  setUserId = (userId) => {
    this.setState({userId: userId})
  }

  setError = (error) => {
    this.setState({error})
  }

  setLoginStatus = () => {
    this.setState({loginStatus: TokenService.hasAuthToken()});
  }

  render() {
    return (
      <div className='App'>
        <header className='App-Header'>
          <Header userId={this.state.userId} fetchBooks={this.fetchBooks} clearState={this.clearState} loginStatus={TokenService.hasAuthToken()} setLoginStatus={this.setLoginStatus}/>
        </header>
        <main className='App-Main'>
          <Switch>
            <Route exact path={'/'} render={props => (<LandingPage {...props} />) }/>
            <Route exact path={'/register'} render={props => (TokenService.hasAuthToken() ? <LandingPage {...props} />: <RegistrationPage {...props}/>)}/>
            <Route exact path={'/login'} render={props => (TokenService.hasAuthToken() ? <LandingPage {...props} />: <LoginPage fetchBooks={this.fetchBooks} userId={this.state.userId} setUserId={this.setUserId} {...props}/>)}/>
            <Route exact path={'/demo'} render={props => (TokenService.hasAuthToken() ? <LandingPage {...props} />: <DemoPage userId={this.state.userId} setUserId={this.setUserId} {...props}/>)}/>
            {/* How to differentiate between new users and async fetch? */}
            <Route exact path={'/users/:user_id'} render={props => (TokenService.hasAuthToken() ? this.state.booksLoaded ? <UserBookList {...props} fetchBooks={this.fetchBooks} books={this.state.books} userId={this.state.userId} setBooks={this.setBooks} setUserId={this.setUserId} setError={this.setError} error={this.state.error}/> : <p>Loading...</p> : <Redirect to = {'/login'}/> )}/>
            <Route exact path={'/users/:user_id/books/:book_id'} render={props => (TokenService.hasAuthToken() ? <UserBook {...props} books={this.state.books} fetchBooks={this.fetchBooks} userId={this.state.userId} setBooks={this.setBooks} setUserId={this.setUserId} setError={this.setError} error={this.state.error}/> : <Redirect to = {'/login'}/>)}/>
            <Route exact path={'/users/:user_id/add-book'} render={props => (TokenService.hasAuthToken() ? <AddBook {...props} fetchBooks={this.fetchBooks} books={this.state.books} userId={this.state.userId} setBooks={this.setBooks} setError={this.setEror} error={this.state.error}/> : <Redirect to={'/login'}/>)}/>
            <Route exact path={'/users/:user_id/profile'} render={props => (TokenService.hasAuthToken() ? <UserProfile {...props} books={this.state.books} userId={this.state.userId} setBooks={this.setBooks} setUserId={this.setUserId} setError={this.setError} error={this.state.error}/> : <Redirect to = {'/login'}/> )}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;