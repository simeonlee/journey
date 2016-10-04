module.exports = {
  facebook: {
    appID: 'FACEBOOK_APP_ID',
    appSecret: 'FACEBOOK_APP_SECRET',
    callbackUrl: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'email', 'gender', 'age_range', 'link', 'picture', 'locale', 'timezone', 'updated_time', 'verified']
  }
}