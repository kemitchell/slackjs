var request = require('request');
var Slack = require('./lib/slackjs');

module.exports = {
  _token: '',
  _domain: '',
  _sessions: [],

  config: function(conf) {
    this._token = conf.token;
    this._domain = this._domainTrim(conf.domain);
  },

  newSession: function(channel, username, emoji, emoji_url) {
    if (this._sessions[channel] === undefined) {
      this._sessions[channel] = [];
    }
    this._sessions[channel][username] = new Slack(request, {
      token: this._token,
      domain: this._domain,
      channel: channel,
      username: username,
      emoji: emoji,
      emoji_url: emoji_url
    });

    return this._sessions[channel][username];
  },

  getSession: function(channel, username) {
    if (this._sessions[channel] !== undefined) {
      if (this._sessions[channel][username] !== undefined) {
        return this._sessions[channel][username];
      }
    }
    return null;
  },

  _domainTrim: function(url) {
    var pieces = url.match(/(https:\/\/|http:\/\/)?([^\.]*)(\.slack.com)?/);
    return pieces[2];
  }
}