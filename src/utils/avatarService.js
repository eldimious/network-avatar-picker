const util = require('util');
const cheerio = require('cheerio');
const request = util.promisify(require('request'));

function init() {
  const handleRequestErrors = (response, network) => {
    if (response.statusCode !== 200) {
      throw Error(`Get ${network} avatar statusCode !== 200.`);
    }
    if (!response.body) {
      throw new Error(`Get ${network} avatar no response body.`);
    }
  };

  const getImage = async function getImage(url, network) {
    try {
      const response = await request.getAsync({ url, encoding: null });
      handleRequestErrors(response, network);
      if (network === 'twitter' && response.headers && response.headers['content-type'] && response.headers['content-type'].includes('text/html')) {
        throw new Error(`Get ${network} avatar no response body.`);
      }
      return response.body;
    } catch (error) {
      throw error;
    }
  };

  const findImageUrl = async function findImageUrl(url, network) {
    try {
      const response = await request.getAsync({ url, encoding: null });
      handleRequestErrors(response, network);
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
        throw new Error(`${network} get avatar image url not found.`);
      }
      return ogImage;
    } catch (error) {
      throw error;
    }
  };

  return Object.freeze({
    getImage,
    findImageUrl,
  });
}

module.exports.init = init;
