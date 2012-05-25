var config = {};

config.port = 8000;
config.address = 'localhost';
config.twitter_username = process.env.TWITTER_USERNAME || 'TWITTER USERNAME';
config.twitter_password = process.env.TWITTER_PASSWORD || 'PASSWORD';

module.exports = config;
