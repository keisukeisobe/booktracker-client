import React, { Component } from 'react'
import config from '../config'
import TokenService from '../services/token-service';
import './AddBook.css'

export default class AddBook extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  handleAddBookSuccess = book_id => {
    const { history } = this.props
    //this.props.fetchBooks()
    history.push(`/users/${this.props.userId}`)
  }

  handleSubmit = event => {
    event.preventDefault();
    const title = event.target.title;
    const author = event.target.author;
    const description = event.target.description;
    const maxpagecount = event.target.maxpagecount;
    let response = null;
    fetch(`${config.API_ENDPOINT}/users/${this.props.userId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        title: title.value,
        author: author.value,
        description: description.value,
        maxpagecount: maxpagecount.value
      }),
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .then( (res) => {
        response = res
        return this.props.fetchBooks()
      })
      .then ( () => {
        title.value = '';
        author.value = '';
        description.value = '';
        maxpagecount.value = '';
        this.handleAddBookSuccess(response.book_id)
      })
  }

  render() {
    return (
      <form className="AddBookForm" onSubmit={this.handleSubmit}>
        <h2 className='add-book-h2'>Add Book</h2>
        <div className='grid-container'>
          <label className='add-book-label' htmlFor="title"> Title:</label>
          <input className='add-book-input' type="text" name="title" id="title" required></input>
          <label className='add-book-label' htmlFor='author'> Author: </label>
          <input className='add-book-input' type='text' name="author" id="author" required></input>
          <label className='add-book-label' htmlFor="description">Description:</label>
          <input className='add-book-input' type="text" name="description" id="description" required></input>
          <label className='add-book-label' htmlFor="maxpagecount">Pagecount:</label>
          <input className='add-book-input' type="number" min="0" name="maxpagecount" id="maxpagecount" required></input>
        </div>
        <button className='add-book-button' type='submit'>Submit</button>
      </form>
    );
  }
}