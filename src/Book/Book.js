import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Book extends Component {
  render(){
    const book = this.props.book
    const userId = this.props.userId
    return (
      <Link to={`/users/${userId}/books/${book.book_id}`}>
        <div className="Details">
          <h2>
            {book.title}
          </h2>
          <p>Reading Status: {book.status}</p>
          <p>Progress: {book.percent}%</p>
          <p>Personal Rating: {book.rating}</p>
          <p>Book ID: {book.book_id}</p>
        </div>
      </Link>
    )
  }
}