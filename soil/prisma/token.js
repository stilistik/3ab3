const crypto = require('crypto');

crypto.randomBytes(48, function(err, buffer) {
  var token = buffer.toString('hex');
  // eslint-disable-next-line no-console
  console.log(token);
});
