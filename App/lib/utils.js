function FetchHideError(response) {
  this.name = 'FetchHideError';
  this.show = false;
  this.response = (response || {});
  this.message = (response.statusText || '');
  this.status = (response.status || '');
}
FetchHideError.prototype = Error.prototype;


// verif status response for fetch
export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  const error = new FetchHideError(response);
  throw error;
};
