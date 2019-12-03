import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../Book/Book'
import './UserBookList.css'

export default class UserBookList extends Component {
  state = {
    readingStatusFilter: '',
    ratingFilter: 0,
    sort: '',
    books: this.props.books,
  }
  
  static defaultProps = {
    match: {params: {} }
  }

  componentDidMount() {
    const userId = this.props.match.params.user_id;
    this.props.setUserId(userId);
    this.setState({displayBooks: this.state.books})
    this.props.fetchBooks()
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
      <div className='Filter-Container'>
        <label className='sort-label' htmlFor="sort">Sort by: </label>
        <select className='sort-select' name="sort" value={this.state.sort} id="sort" onChange={this.handleSortClick}>
          <option value="title">Title</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    )
  }

  handleReadingStatusFilterClick = (event) => {
    const readingStatusToString = {
      blankStatus: '',
      readingStatusInProgress: 'in progress',
      readingStatusDNF: 'DNF',
      readingStatusCompleted: 'completed'
    }
    this.setState({readingStatusFilter: readingStatusToString[event.target.value]})
  }

  renderReadingStatusFilter() {
    return (
      <div className='Filter-Container'>
        <label className='sort-label' htmlFor="readingStatusFilter">Reading Status: </label>
        <select className='sort-select' name="readingStatusFilter" value={this.state.filter} id="readingStatusFilter" onChange={this.handleReadingStatusFilterClick}>
          <option value="blankStatus">No Filter</option>
          <option value="readingStatusInProgress">In Progress</option>
          <option value="readingStatusCompleted">Completed</option>
          <option value="readingStatusDNF">Did Not Finish</option>
        </select>
      </div>
    )
  }

  handleRatingFilterClick = (event) => {
    const ratingToNumber = {
      rating0: 0,
      rating1: 1,
      rating2: 2,
      rating3: 3,
      rating4: 4,
      rating5: 5,
    }
    this.setState({ratingFilter: ratingToNumber[event.target.value]})
  }

  renderRatingFilter(){
    return (
      <div className='Filter-Container'>
        <label className='sort-label' htmlFor="ratingFilter">Rating: </label>
        <select className='sort-select' name="ratingFilter" value={this.state.filter} id="ratingFilter" onChange={this.handleRatingFilterClick}>
          <option value="allrating">No Filter</option>
          <option value="rating5">Rating: 5</option>
          <option value="rating4">Rating: 4</option>
          <option value="rating3">Rating: 3</option>
          <option value="rating2">Rating: 2</option>
          <option value="rating1">Rating: 1</option>
          <option value="rating0">No Rating</option>
        </select>
      </div>
    )
  }

  renderSubHeader() {
    return (
      <>
        <h2 className='UserBookList-Header'>My Books</h2>
          <Link className='AddBook-Link'
            to={`/users/${this.props.userId}/add-book`}>
            <i className="fas fa-plus fa-2x"></i>
            <br></br>
            <p className='Log-Logo-Text'>Add Book</p>
          </Link>  
      </>
    )
  }

  renderBooks() {
    let books = this.state.books
    if(this.state.ratingFilter){
      books = books.filter(book => book.rating === this.state.ratingFilter)
    }
    if(this.state.readingStatusFilter){
      books = books.filter(book => book.status === this.state.readingStatusFilter)
    }
    const userId = this.props.userId
    if (this.props.booksNumber === 0) {
      return <p className='Error'>Loading...</p>
    } else {
      return (
        <div className='UserBookList-Main'>
          <div className='Filter-Sort'>
            {this.renderSubHeader()}
            {this.renderSort()}
            {this.renderReadingStatusFilter()}
            {this.renderRatingFilter()}
          </div>
          {books.map(book => {
            return (
              <div key={book.book_id} className="Booklist">
                <Book book={book} userId={userId} details={false}/>
              </div>
            )
          })}
        </div>
      )
    }
  }

  render() {
    let content
    if (this.props.error === {}) {
      content = <p className="Error">There was an error</p>
    } 
    if (this.props.books.length === 0) {
      content = <p className="NoBookError">You have no books! Click add book to add your first book.</p>
    } else {
      content = this.renderBooks()
    }
    return content
  }
}