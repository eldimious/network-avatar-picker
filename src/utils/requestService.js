const {
  promisify,
} = require('util');
const {
  get,
} = require('request');

const [
  getPromisified,
] = [get].map(promisify);

module.exports = {
  getPromisified,
};
