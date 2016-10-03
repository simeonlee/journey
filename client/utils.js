import axios from 'axios';

var authenticateUser = (nextState, replace, cb) => {
  axios.get('/auth')
    .then((res) => {
      if (res.data === '') {
        replace('/');
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

var checkIfLoggedIn = (nextState, replace, cb) => {
  axios.get('/auth')
    .then((res) => {
      if (res.data === '') {
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