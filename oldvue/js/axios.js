import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  const errorMessage = _.get(error, 'response.data.message');
  const status = error.response.status.toString();

  Vue.$flash(errorMessage)
  
  return Promise.reject(error);
});

export default axios;