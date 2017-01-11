import App from '../App';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default {
  component: App,
  path: '/',
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], () => {
        cb(null, require('../Components/Home').default); // eslint-disable-line
      });
    },
  },
  childRoutes: [
    {
      path: '(/)',
      getComponent(location, cb) {
        require.ensure([], () => {
          cb(null, require('../Components/Home').default); // eslint-disable-line
        });
      },
    },
    {
      path: '/Post/:id',
      getComponent(location, cb) {
        require.ensure([], () => {
          cb(null, require('../Components/Post').default); // eslint-disable-line
        });
      },
    },
  ],
};
