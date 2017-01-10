import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class Lol extends Component {
  static propTypes = {
    click: PropTypes.number,
  }
  static defaultProps = {
    click: 0,
  }
  static getInitialProps() {
    return { props: 'plop' };
  }
  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    return (
      <div>
        <p>LOL</p>
        <b>{'J\'affiche aussi le click ici:'}</b> {this.props.click}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    click: store.click,
  };
}

export default connect(mapStateToProps)(Lol);
