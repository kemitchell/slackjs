var util = require('util');

var PROTOCOL = 'https';
var SLACK_PARENT_DOMAIN = 'slack.com';
var SLACK_ENDPOINT = '/services/hooks/incoming-webhook?token=';

function Slack(request, config, cb) {
  this.request = request;

  this.token = config.token;
  this.domain = config.domain;
  this.channel = config.channel;
  this.username = config.username;
  this.useEmojiUrl = config.emoji_url !== undefined;
  this.emoji = config.emoji;
  this.emoji_url = config.emoji_url;

  if (cb) {
    cb(this);
  }
}

Slack.prototype.message = function(message, cb) {
  var url = util.format(
    '%s://%s.%s%s%s',
    PROTOCOL,
    this.domain,
    SLACK_PARENT_DOMAIN,
    SLACK_ENDPOINT,
    this.token
  );

  var options = {
    'channel': this.channel,
    'text': message,
    'username': this.username
  }
  if (this.useEmojiUrl) {
    options['icon_url'] = this.emoji_url;
  } else {
    options['icon_emoji'] = this.emoji;
  }

  var self = this;

  this.request.post({'url': url, body: JSON.stringify(options)}, function(err, res, body) {
    if (cb) {
      cb(self, err, res, body);
    }
  });

  if (cb) {
    cb(this);
  }
};

module.exports = Slack;