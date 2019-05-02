const {
  getPromisified,
} = require('../utils/requestService');
const cheerio = require('cheerio');
const {
  handleRequestErrors,
} = require('../utils/errorsService');

const downloadImage = async function downloadImage(url, network) {
  try {
    const response = await getPromisified({ url, encoding: null });
    handleRequestErrors(response, network);
    return response.body;
  } catch (error) {
    throw error;
  }
};

const extractProfileImageUrl = async function extractProfileImageUrl(network, profileUrl) {
  try {
    if (!network || (network !== 'instagram' && network !== 'vimeo')) {
      throw new Error('Bad network');
    }
    const response = await getPromisified({ url: profileUrl, encoding: null });
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


module.exports = {
  extractProfileImageUrl,
  downloadImage,
};
