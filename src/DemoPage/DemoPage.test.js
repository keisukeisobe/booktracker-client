import React from 'react';
import ReactDOM from 'react-dom';
import DemoPage from './DemoPage';
import { BrowserRouter } from 'react-router-dom'


it('renders <App /> without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><DemoPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})