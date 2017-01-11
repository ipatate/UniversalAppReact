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
    posts: PropTypes.array,
  }
  static defaultProps = {
    click: 0,
    posts: [],
  }
  // array of action use for initialize app before render server
  // function have arg renderProps
  static initialProps = [
    () => Action.setClick('ADD'),
    // () => Action.getPosts(),
  ]
  constructor(props, context) {
    super(props, context);
    this.handler = this.handler.bind(this);
  }
  componentDidMount() {
    const { dispatch, posts } = this.props;
    // if (posts.length === 0) {
    //   dispatch(Action.getPosts());
    // }
  }
  handler(action) {
    const { dispatch } = this.props;
    dispatch(Action.setClick(action));
  }
  render() {
    const { t, posts } = this.props;
    return (
      <div>
        <Link to="Lol">{t('lol')}</Link>
        <p>{t('number_of_click')} {this.props.click}</p>
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
        {posts.map((post) => {
          return (
            <b>{post.title.rendered}</b>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    click: store.click,
    posts: store.posts,
  };
}

export default translate()(connect(mapStateToProps)(Home));
