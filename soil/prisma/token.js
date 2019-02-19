const crypto = require('crypto');

crypto.randomBytes(8, function(err, buffer) {
  var token = buffer.toString('base64');
  // eslint-disable-next-line no-console
  console.log(token);
});
