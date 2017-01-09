import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DevTools from './Components/DevTools';
const App = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default App;
