slackjs
=======

Node module for the Slack Incoming Webhooks API

```javascript
var slack = require('slackjs');

slack.config({
  token: 'yourtoken',
  domain: 'yourdomain'
});

var session = test.newSession('#general', 'FancyBot', ':ghost:');

session.message("Hello World!!!!!!!");
```