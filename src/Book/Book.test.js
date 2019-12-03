import React from 'react';
import ReactDOM from 'react-dom';
import Book from './Book';
import { BrowserRouter } from 'react-router-dom'


it('renders <App /> without crashing', () => {
  const div = document.createElement('div');
  const userId = 1;
  const book = { 
    title: 'The Final Empire',
    description: 'Mistborn Book 1',
    status: 'completed',
    percent: 1,
    rating: 5,
    plot: 0,
    prose: 0,
    characters: 0,
    worldbuilding: 0,
    theme: 0,
    content: 'great',
    progress_id: 1,
    book_id: 1,
    pagecount: 637,
    maxpagecount: 637,
    reading_status: 'completed' };
  ReactDOM.render(
    <BrowserRouter>
      <Book key={book.id} book={book} userId={userId} details={true}/>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})