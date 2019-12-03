import React from 'react';
import ReactDOM from 'react-dom';
import DemoPage from './DemoPage';


it('renders <App /> without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DemoPage />, div);
  ReactDOM.unmountComponentAtNode(div);
})