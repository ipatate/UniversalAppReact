import React, { PropTypes } from 'react';
import Header from './Components/Header';

const App = (props) => {
  return (
    <div>
      <Header {...props} />
      <div className="content">
        {props.children}
      </div>
    </div>
  );
};
App.propTypes = {
  children: PropTypes.object.isRequired,
};
export default App;
