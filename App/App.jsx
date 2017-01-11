import React, { PropTypes, Component } from 'react';
import Header from './Components/Header';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    changeLanguage: PropTypes.func,
  };
  static defaultProps = {
    changeLanguage: () => {},
  }
  constructor(props) {
    super(props);
    this.changeLanguage = this.changeLanguage.bind(this);
  }
  changeLanguage(e, lng) {
    const { changeLanguage } = this.props;
    e.preventDefault();
    changeLanguage(lng);
  }
  render() {
    return (
      <div>
        <Header />
        <div>
          <button onClick={e => this.changeLanguage(e, 'fr')}>fr</button>{'|'}
          <button onClick={e => this.changeLanguage(e, 'en')}>en</button>
        </div>
        {this.props.children}
      </div>
    );
  }
}


export default App;
