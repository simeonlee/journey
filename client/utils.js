import axios from 'axios';

var authenticateUser = (nextState, replace, cb) => {
  axios.get('/auth')
    .then((res) => {
      console.log('res.data: ', res.data);
      if (res.data) {
        cb();
      } else {
        replace('/');
        cb();
      }
    })
    .catch((err) => {
      console.log(err);
      cb();
    })
};

var checkIfLoggedIn = (nextState, replace, cb) => {
  axios.get('/auth')
    .then((res) => {
      if (res.data) {
        cb()
      } else {
        cb()
      }
    })
}

module.exports = {
  authenticateUser: authenticateUser,
  checkIfLoggedIn: checkIfLoggedIn
}