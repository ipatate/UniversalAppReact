import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import * as Action from '../redux/actions/';

export class Header extends Component {
  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }
  // array of action use for initialize app before render server
  // function have arg renderProps
  static initialProps = [
    () => Action.setClick('ADD'),
  ]
  render() {
    const { t } = this.props;
    return (
      <div>
        {t('header')}
      </div>
    );
  }
}

export default translate()(connect()(Header));
