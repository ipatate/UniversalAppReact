import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router';
import * as Action from '../redux/actions/';

export class Post extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    post: PropTypes.object,
    params: PropTypes.object.isRequired,
  }
  static defaultProps = {
    post: [],
  }
  static initialProps = [
    (renderProps) => {
      return Action.findPost(renderProps.params.id);
    },
  ]
  componentDidMount() {
    const { dispatch, post, params } = this.props;
    const id = params.id || false;
    // if no post or post.id not equal id from url
    if (post.id === undefined || post.id !== +id) {
      dispatch(Action.findPost(id));
    }
  }
  render() {
    const { post, t } = this.props;
    const back = <div className="gm-post__back"><Link to="/">{t('back_list')}</Link></div>;
    if (post.id) {
      return (
        <div>
          {back}
          <div className="gm-post__content">
            <h2 className="gm-post__content--title">{post.title}</h2>
            <p className="gm-post__content--body">{post.body}</p>
          </div>
        </div>
      );
    }
    return <div className="gm-loader__container"><div className="gm-loader__load">{''}</div></div>;
  }
}

function mapStateToProps(store) {
  return {
    post: store.post,
  };
}

export default translate(['common'])(connect(mapStateToProps)(Post));
