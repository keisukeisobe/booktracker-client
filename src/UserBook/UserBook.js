import React, { Component } from 'react'
import config from '../config'
import TokenService from '../services/token-service'
import Book from '../Book/Book'
import UpdateBookForm from '../UpdateBookForm/UpdateBookForm'


export default class UserBook extends Component {
  state = {
    books: this.props.books
  }
  static defaultProps = {
    match: {params: {} }
  }

  componentDidMount () {
    const newBooks = [...this.state.books]
    this.setState({books: newBooks})
    const userId  = this.props.match.params.user_id
    const bookId = this.props.match.params.book_id
    this.props.setUserId(userId);
    fetch(`${config.API_ENDPOINT}/users/${userId}/books/${bookId}`, {
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
        this.setState({books})
      })
  }

  componentWillUnmount() {
    this.props.setError(null)
  }

  //consider making this a presentational component-- only takes generated data in as props
  renderBooks() {
    const userId = this.props.userId
    const bookId = this.props.match.params.book_id
    const newBooks = [...this.state.books]
    if (this.state.books.length === 0 ){
      return <p>Loading...</p>
    } else {
      const book = newBooks.filter(book => Number(book.book_id) === Number(bookId))[0]
      return (
        <>
          <div className="Booklist">
            <Book key={book.id} book={book} userId={userId} details={true}/>
            <UpdateBookForm key={book.id} book={book} userId={userId}/>
          </div>
        </>
      )
    }
  }

  render() {
    let content
    if (this.props.error === {}) {
      content = <p className="Error">There was an error</p>
    } else {
      content = this.renderBooks();
    }
    return content
  }
}