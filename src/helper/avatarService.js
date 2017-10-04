'use strict';
const Promise = require('bluebird');
const cheerio = require('cheerio');
const request = require('request');
Promise.promisifyAll(require('request'));


function init() {
  const createErrorMessage = (error, defaultMsg) => error && error.message ? error.message : defaultMsg;


  const getImage = (url, network) => request.getAsync({ url, encoding: null })
    .then((response) => {
      if (response.statusCode !== 200) {
        return Promise.reject(new Error(`Get ${network} avatar statusCode !== 200.`));
      }
      if (!response.body) {
        return Promise.reject(new Error(`Get ${network} avatar no response body.`));
      }
      if (network === 'twitter' && response.headers && response.headers['content-type'] && response.headers['content-type'].includes('text/html')) {
        return Promise.reject(new Error(`Get ${network} avatar no response body.`));
      }
      return response.body;
    })
    .catch(error => Promise.reject(new Error(createErrorMessage(error, `Error in ${network} get avatar function.`))));


  const findImage = (url, network) => request.getAsync({ url, encoding: null })
    .then((response) => {
      if (response.statusCode !== 200) {
        return Promise.reject(new Error(`Get ${network} avatar statusCode !== 200.`));
      }
      if (!response.body) {
        return Promise.reject(new Error(`Get ${network} avatar no response body.`));
      }
      const $ = cheerio.load(response.body);
      const meta = $('meta');
      const keys = Object.keys(meta);
      let ogImage;
      keys.forEach((key) => {
        if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:image') {
          ogImage = meta[key].attribs.content;
        }
      });
      if (!ogImage) {
        return Promise.reject(new Error(`${network} get avatar image url not found.`));
      }
      return ogImage;
    })
    .catch(error => Promise.reject(new Error(createErrorMessage(error, `Error in ${network} get avatar function.`))));

  return Object.freeze({
    getImage,
    findImage,
  });
}

module.exports.init = init;

