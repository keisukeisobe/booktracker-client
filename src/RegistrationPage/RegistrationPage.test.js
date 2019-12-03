import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage';
import { BrowserRouter } from 'react-router-dom'

it('renders <App /> without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><RegistrationPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})