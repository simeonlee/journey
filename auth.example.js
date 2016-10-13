var facebookCallbackUrl = process.env.NODE_ENV === 'production' ? 'https://yourjourney.io/auth/facebook/callback' : 'http://localhost:3000/auth/facebook/callback';
var amazonCallbackUrl = process.env.NODE_ENV === 'production' ? 'https://yourjourney.io/auth/amazon/callback' : 'http://localhost:3000/auth/amazon/callback';

module.exports = {
  facebook: {
    appID: 'FACEBOOK_APP_ID',
    appSecret: 'FACEBOOK_APP_SECRET',
    callbackUrl: facebookCallbackUrl,
    profileFields: ['id', 'displayName', 'name', 'email', 'gender', 'age_range', 'link', 'picture', 'locale', 'timezone', 'updated_time', 'verified']
  },
  amazon: {
    appID: 'AMAZON_APP_ID',
    appSecret: 'AMAZON_APP_SECRET',
    callbackUrl: amazonCallbackUrl
  },
  google: {
    type: 'service_account',
    project_id: 'GOOGLE_PROJECT_ID',
    private_key_id: 'GOOGLE_PRIVATE_KEY_ID',
    private_key: 'GOOGLE_PRIVATE_KEY',
    client_email: 'GOOGLE_CLIENT_EMAIL',
    client_id: 'GOOGLE_CLIENT_ID',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'GOOGLE_CLIENT_x509_CERT_URL'
  }
}