const crypto = require('crypto');

const md5 = input =>
  crypto
    .createHash('md5')
    .update(input)
    .digest('hex');


module.exports = {
  md5,
};
