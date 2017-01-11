import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func,
  }
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
    const { t } = this.props;
    return (
      <header>
        <div className="gm-header__content">
          <h1><Link to="/">{t('header_title')}</Link></h1>
          <div className="gm-header__lang">
            <button onClick={e => this.changeLanguage(e, 'fr')}>fr</button>
            <button onClick={e => this.changeLanguage(e, 'en')}>en</button>
          </div>
        </div>
      </header>
    );
  }
}

export default translate(['common'])(connect()(Header));
