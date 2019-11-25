import React, { Component } from 'react'
import config from '../config'
import TokenService from '../services/token-service'
import Book from '../Book/Book'

export default class UserProfile extends Component {
  static defaultProps = {
    match: {params: {} }
  }

  componentDidMount() {
    const userId  = this.props.match.params.user_id;
    this.props.setUserId(userId);
    fetch(`${config.API_ENDPOINT}/users/${userId}/`, {
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
        this.props.setBooks(books)
      })
  }

  componentWillUnmount() {
    this.props.setBooks([])
    this.props.setError(null)
  }

  renderBooks() {
    const books = this.props.books
    const userId = this.props.userId
    if (!books) {
      return <p>Loading...</p>
    } else {
      return books.map(book => {
        return (
          <div key={book.book_id} className="Booklist">
            <Book book={book} userId={userId}/>
          </div>
        )
      })
    }
  }

  render() {
    let content
    if (this.props.error === {}) {
      content = <p className="Error">There was an error</p>
    } else {
      content = this.renderBooks()
    }
    return content
  }
}