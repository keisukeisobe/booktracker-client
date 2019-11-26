import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

export default class Book extends Component {
  createContent() {
    const book = this.props.book
    const bookData = [
      {
        data: {
          rating: book.rating/5,
          plot: book.plot/5,
          prose: book.prose/5,
          characters: book.characters/5,
          worldbuilding: book.worldbuilding/5,
          theme: book.theme/5
        },
        meta: {color: 'blue'}
      }
    ]
    const captions = {rating: 'Personal Rating', plot: 'Plot', prose: 'Prose', characters: 'Characters', worldbuilding: 'Worldbuilding', theme: 'Theme'}
    let content = (
      <div className="Details">
        <h2>
          {book.title}
        </h2>
        <p>Status: {book.status}</p>
        {this.props.details ? <p>Progress: {book.pagecount}/{book.maxpagecount} pages, {(100*book.percent).toPrecision(3)}% complete</p>:<p>Progress: {(100*book.percent).toPrecision(3)}%</p>}
        <p>Personal Rating: {this.props.book.rating}/5</p>
        {this.props.details && <RadarChart captions={captions} data={bookData} options={{scales: 5, captionProps: ()=> ({className: 'caption', fontSize: 16, textAnchor: 'middle', fontFamily: 'sans-serif'})}}size={450}/>}
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
        <Link to={`/users/${userId}/books/${book.book_id}`}>
          {content}
        </Link>
      )
    }
  }
}