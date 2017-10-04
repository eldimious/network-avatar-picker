'use strict';

var Promise = require('bluebird');
var cheerio = require('cheerio');
var request = require('request');
Promise.promisifyAll(require('request'));

function init() {
  var createErrorMessage = function createErrorMessage(error, defaultMsg) {
    return error && error.message ? error.message : defaultMsg;
  };

  var getImage = function getImage(url, network) {
    return request.getAsync({ url: url, encoding: null }).then(function (response) {
      if (response.statusCode !== 200) {
        return Promise.reject(new Error('Get ' + network + ' avatar statusCode !== 200.'));
      }
      if (!response.body) {
        return Promise.reject(new Error('Get ' + network + ' avatar no response body.'));
      }
      if (network === 'twitter' && response.headers && response.headers['content-type'] && response.headers['content-type'].includes('text/html')) {
        return Promise.reject(new Error('Get ' + network + ' avatar no response body.'));
      }
      return response.body;
    }).catch(function (error) {
      return Promise.reject(new Error(createErrorMessage(error, 'Error in ' + network + ' get avatar function.')));
    });
  };

  var findImage = function findImage(url, network) {
    return request.getAsync({ url: url, encoding: null }).then(function (response) {
      if (response.statusCode !== 200) {
        return Promise.reject(new Error('Get ' + network + ' avatar statusCode !== 200.'));
      }
      if (!response.body) {
        return Promise.reject(new Error('Get ' + network + ' avatar no response body.'));
      }
      var $ = cheerio.load(response.body);
      var meta = $('meta');
      var keys = Object.keys(meta);
      var ogImage = void 0;
      keys.forEach(function (key) {
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:image') {
          ogImage = meta[key].attribs.content;
        }
      });
      if (!ogImage) {
        return Promise.reject(new Error(network + ' get avatar image url not found.'));
      }
      return ogImage;
    }).catch(function (error) {
      return Promise.reject(new Error(createErrorMessage(error, 'Error in ' + network + ' get avatar function.')));
    });
  };

  return Object.freeze({
    getImage: getImage,
    findImage: findImage
  });
}

module.exports.init = init;