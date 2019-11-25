import React, { Component } from 'react'
import config from '../config'
import TokenService from '../services/token-service';

export default class AddBook extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  handleAddBookSuccess = user => {
    const { history } = this.props
    history.push(`/users/${this.props.userId}`)
  }

  handleSubmit= event => {
    event.preventDefault();
    const title = event.target.title;
    const author = event.target.author;
    const description = event.target.description;
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
      }),
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        } else {
          return res.json();
        }
      })
      .then( () => {
        title.value = '';
        author.value = '';
        description.value = '';
        this.handleAddBookSuccess();
      })
  }

  render() {
    return (
      <form className="AddBookForm" onSubmit={this.handleSubmit}>
        <div className="title">
          <label htmlFor="title"> Title:
            <input type="text" name="title" id="title" required></input>
          </label>
        </div>
        <div className='author'>
          <label> Author: 
            <input type='text' name="author" id="author" required></input>
          </label>
        </div>        
        <div className="description">
          <label htmlFor="description"> description:
            <input type="text" name="description" id="description" required></input>
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}