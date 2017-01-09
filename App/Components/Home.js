import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../redux/actions/';

export class Home extends Component {
  static getInitialProps() {
    return { props: 'plop' };
  }
  constructor(props, context) {
    super(props, context);
    this.handler = this.handler.bind(this);
  }
  handler(action) {
    const { dispatch } = this.props;
    dispatch(Action.setClick(action));
  }
  render() {
    return (
      <div>
        <p>{'Nb of click'} {this.props.click}</p>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          this.handler('ADD')}}
        >Add</a>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          this.handler('REMOVE')}} >Remove</a>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    click: store.click,
  };
}

export default connect(mapStateToProps)(Home);
