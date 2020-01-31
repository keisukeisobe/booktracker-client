import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'
import './Book.css'

export default class Book extends Component {
  toProperCase(status) {
    let first = status[0].toUpperCase();
    return first + status.slice(1);
  }
  createContent() {
    const book = this.props.book
    const bookData = [
      {
        data: {
          rating: book.rating/5,
          plot: book.plot/5,
          prose: book.prose/5,
          worldbuilding: book.worldbuilding/5,
          characters: book.characters/5,
          theme: book.theme/5
        },
        meta: {color: 'blue'}
      }
    ]
    const captions = {rating: 'Personal Rating', plot: 'Plot', prose: 'Prose', worldbuilding: 'Worldbuilding', characters: 'Characters', theme: 'Theme'}
    let rating = [];
    for (let i = 0; i < book.rating; i++) {
      rating.push(<i key={i} className="active fa fa-star" aria-hidden="true"></i>)
    }
    let content = (
      <div className="details">
        <h2 className='book-title'>
          {book.title}
        </h2>
        <div className='row'>
          <div className='column-left'>
            <p className='book-details'>Status: </p>
            <p className='book-details'>Progress: </p>
            {!this.props.details && <p className='book-details'>Personal Rating: </p>}
          </div>
          <div className='column-right'>
            <p className='book-details'> {(this.toProperCase(book.status))}</p>
            {this.props.details ? <p className='book-details'> {book.pagecount}/{book.maxpagecount} pages</p>:<p className='book-details'>{(100*book.percent).toPrecision(3)}%</p>}
            {!this.props.details && <p className='book-details'>{rating}</p>}
          </div>
        </div>
        {this.props.details && <RadarChart captions={captions} data={bookData} options={{scales: 5, zoomDistance: 1.32, captionMargin: 10, captionProps: ()=> ({fontSize: 16, textAnchor: 'middle', fontWeight: 'bold', fontFamily: 'sans-serif'})}}size={300}/>}
      </div>
    )
    return content
  }

  render(){
    const book = this.props.book
    const userId = this.props.userId
    let content = this.createContent()

    if(this.props.details){
      return (content);
    } else {
      return (
        <Link className='book-link' to={`/users/${userId}/books/${book.book_id}`}>
          {content}
        </Link>
      )
    }
  }
}