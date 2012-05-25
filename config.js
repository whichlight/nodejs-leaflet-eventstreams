var config = {};

config.port = 8000;
config.address = 'localhost';
config.twitter_username = process.env.TWITTER_USERNAME || 'YOUR USERNAME';
config.twitter_password = process.env.TWITTER_PASSWORD || 'YOUR PASSWORD';

module.exports = config;
