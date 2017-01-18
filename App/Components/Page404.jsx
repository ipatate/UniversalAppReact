import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { translate } from 'react-i18next';

const Page404 = ({ t }) => {
  return (
    <div className="gm-page404">
      <h1>{t('404')}</h1>
      <strong>{t('page_not_exist')}</strong>
      <Link to="/">
        {t('back_to_home')}
      </Link>
    </div>
  );
};

Page404.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate(['common'])(Page404);
