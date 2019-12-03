import React from 'react';
import ReactDOM from 'react-dom';
import UpdateBookForm from './UpdateBookForm';
import { BrowserRouter } from 'react-router-dom'

it('renders <App /> without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><UpdateBookForm /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})