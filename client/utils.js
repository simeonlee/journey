import axios from 'axios';

var authenticateUser = (nextState, replace, cb) => {
  console.log('nextState: ', nextState.location.pathname);
  axios.get('/auth')
    .then((res) => {
      console.log('RESPONSE: ', res.data);
      if (res.data === '') {
        replace('login');
        cb();
      } else {
        cb();
      }
    })
    .catch((err) => {
      console.log(err);
      cb();
    })
};

module.exports = {
  authenticateUser: authenticateUser
}