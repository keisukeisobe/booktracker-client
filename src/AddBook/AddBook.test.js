import React from 'react';
import ReactDOM from 'react-dom';
import AddBook from './AddBook';
import { BrowserRouter } from 'react-router-dom'


it('renders <App /> without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddBook />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})