import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Action from '../redux/actions/';

export class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    click: PropTypes.number,
  }
  static defaultProps = {
    click: 0,
  }
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
    const { t } = this.props;
    return (
      <div>
        <Link to="Lol">{t('hello')}</Link>
        <p>{'Nb of click'} {this.props.click}</p>
        <a
          href="" onClick={(e) => {
            e.preventDefault();
            this.handler('ADD');
          }}
        >Add</a>{' / '}
        <a
          href="" onClick={(e) => {
            e.preventDefault();
            this.handler('REMOVE');
          }}
        >Remove
        </a>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    click: store.click,
  };
}

export default translate()(connect(mapStateToProps)(Home));
