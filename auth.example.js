module.exports = {
  facebook: {
    appID: '375795929474685',
    appSecret: '12ac4bba2a39f62daa21bf56f634e5ba',
    callbackUrl: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'email', 'gender', 'age_range', 'link', 'picture', 'locale', 'timezone', 'updated_time', 'verified']
  },
  amazon: {
    appID: 'amzn1.application-oa2-client.41972f7c249543a28d6fbc8327634db8',
    appSecret: '5f8034e6180e41ad22870598aa701c6d84d341ee5035f04e53c8b2ffd86602c6',
    callbackUrl: 'http://localhost:3000/auth/amazon/callback'
  }
}