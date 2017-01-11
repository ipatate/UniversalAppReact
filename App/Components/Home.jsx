import React, { Component, PropTypes } from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Action from '../redux/actions/';

export class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    posts: PropTypes.array,
  }
  static defaultProps = {
    posts: [],
  }
  // array of action use for initialize app before render server
  // function have arg renderProps
  static initialProps = [
    () => Action.loadPosts(),
  ]
  constructor(props, context) {
    super(props, context);
    this.handler = this.handler.bind(this);
  }
  componentDidMount() {
    const { dispatch, posts } = this.props;
    if (posts.length === 0) {
      dispatch(Action.loadPosts());
    }
  }
  handler() {
    const { dispatch } = this.props;
    dispatch(Action.reloadPost());
  }
  render() {
    const { t, posts } = this.props;
    return (
      <div>
        <div className="gm-posts__reload">
          <a
            href="" className="gm-posts__reload--button" onClick={(e) => {
              e.preventDefault();
              this.handler();
            }}
          >{t('posts_reload')}</a>
        </div>
        {posts.length > 0 ?
          <ul className="gm-posts__list">
            {posts.map((post) => {
              return (
                <li className="gm-posts__element" key={`post_${post.id}`} >
                  <h4 className="gm-posts__element--title"><Link to={`/Post/${post.id}`}>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</Link></h4>
                  <p className="gm-posts__element--body">{post.body.substr(0, 120)}{post.body.length > 120 ? '...' : ''}</p>
                  <Link className="gm-posts__element--more" to={`/Post/${post.id}`}>{t('read_more')}</Link>
                </li>
              );
            })}
          </ul>
        : <div className="gm-loader__container"><div className="gm-loader__load">{''}</div></div> }
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    posts: store.posts,
  };
}

export default translate(['common'])(connect(mapStateToProps)(Home));
