import React, { Component } from 'react';
import config from '../config';
import TokenService from '../services/token-service';
import './AddBook.css';

export default class AddBook extends Component {
  state = {
    title: '',
    author: '',
    maxpagecount: '',
    description: '',
  }
  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  handleAddBookSuccess = book_id => {
    const { history } = this.props
    history.push(`/users/${this.props.userId}`)
  }


  handleChange = (event, isNumber=false) => {
    const target = event.target
    const name = target.name
    if (isNumber){
      const val = Number(event.target.value)
      this.setState({[name]: val})
    } else {
      this.setState({[name]: event.target.value})
    }
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
      <form className="add-book-form" onSubmit={this.handleSubmit}>
        <h2 className='add-book-h2'>Add Book</h2>
        <div className='grid-container-add-book'>
          <label className='add-book-label' htmlFor="title"> Title:</label>
          <input className='add-book-input' type="text" name="title" id="title" value={this.state.title} onChange={e=>this.handleChange(e, false)} required></input>
          <label className='add-book-label' htmlFor='author'> Author: </label>
          <input className='add-book-input' type='text' name="author" id="author" value={this.state.author} onChange={e=>this.handleChange(e, false)} required></input>
          <label className='add-book-label' htmlFor="maxpagecount">Pagecount:</label>
          <input className='add-book-input' type="number" min="0" name="maxpagecount" id="maxpagecount" value={this.state.maxpagecount} onChange={e=>this.handleChange(e, true)} required></input>
          <label className='add-book-label' htmlFor="description">Description:</label>
          <textarea className="add-book-textarea" name="description" id="description" value={this.state.description} onChange={e=>this.handleChange(e, false)} required/>
        </div>
        <button className='add-book-button' type='submit'>Submit</button>
      </form>
    );
  }
}