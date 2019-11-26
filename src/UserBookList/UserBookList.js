import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Book/Book'

export default class UserBookList extends Component {
  state = {
    filter: '',
    sort: '',
    books: this.props.books,
  }
  
  static defaultProps = {
    match: {params: {} }
  }

  componentDidMount() {
    const userId = this.props.match.params.user_id;
    this.props.setUserId(userId);
  }

  componentWillUnmount() {
    this.props.setError(null)
  }

  handleFilterClick = (event) => {
    const newBooks = [...this.props.books]
    if(event.target.value ===''){
      this.setState({books: newBooks})
    }
    if(event.target.value === 'readingStatusInProgress'){
      this.setState({books: newBooks.filter(book => book.status==='in progress')})
    }
    if(event.target.value === 'readingStatusCompleted'){
      this.setState({books: newBooks.filter(book => book.status==='completed')})
    }
    if(event.target.value === 'readingStatusDNF'){
      this.setState({books: newBooks.filter(book => book.status==='DNF')})
    }
    if(event.target.value === 'rating5'){
      this.setState({books: newBooks.filter(book => book.rating === 5)})
    }
    if(event.target.value === 'rating4'){
      this.setState({books: newBooks.filter(book => book.rating >= 4)})
    }
    if(event.target.value === 'rating3'){
      this.setState({books: newBooks.filter(book => book.rating >= 3)})
    }
    if(event.target.value === 'rating2'){
      this.setState({books: newBooks.filter(book => book.rating >= 2)})
    }
    this.setState({filter: event.target.value})
  }

  handleSortClick = (event) => {
    const newBooks = [...this.props.books]
    if(event.target.value === ''){
      this.setState({books: newBooks})
    }
    if(event.target.value === 'rating'){
      this.setState({books: newBooks.sort(function(a, b){
        return b.rating - a.rating
      })})
    }
    if(event.target.value === 'title'){
      this.setState({books: newBooks.sort(function(a, b){
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB){
          return -1
        }
        if (titleA > titleB){
          return 1
        }
        return 0;
      })})
    }
    this.setState({sort: event.target.value})
  }

  renderSort() {
    return (
      <>
        <label htmlFor="sort">Sort by: </label>
        <select name="sort" value={this.state.sort} id="sort" onChange={this.handleSortClick}>
          <option value="title">Title</option>
          <option value="rating">Rating</option>
        </select>
      </>
    )
  }

  renderFilter() {
    return (
      <>
        <label htmlFor="filter">Filter: </label>
        <select name="filter" value={this.state.filter} id="filter" onChange={this.handleFilterClick}>
          <option value="">No Filter</option>
          <option value="readingStatusInProgress">In Progress</option>
          <option value="readingStatusCompleted">Completed</option>
          <option value="readingStatusDNF">Did Not Finish</option>
          <option value="rating5">Rating: 5</option>
          <option value="rating4">Rating: 4</option>
          <option value="rating3">Rating: 3</option>
          <option value="rating2">Rating: 2</option>
        </select>
      </>
    )
  }

  renderSubHeader() {
    return (
      <>
        <h2>My Books</h2>
          <Link
            to={`/users/${this.props.userId}/add-book`}>
            Add Book
          </Link>  
      </>
    )
  }

  renderBooks() {
    const books = this.state.books
    const userId = this.props.userId
    if (this.props.booksNumber === 0) {
      return <p>Loading...</p>
    } else {
      return (
        <>
          {this.renderSubHeader()}
          <br></br>
          {this.renderSort()}
          <br></br>
          {this.renderFilter()}
          {books.map(book => {
            return (
              <div key={book.book_id} className="Booklist">
                <Book book={book} userId={userId} details={false}/>
              </div>
            )
          })}
        </>
      )
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