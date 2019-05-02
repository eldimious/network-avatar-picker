const {
  getPromisified,
} = require('../utils/requestService');
const cheerio = require('cheerio');
const {
  handleRequestErrors,
} = require('../utils/errorsService');

const downloadImage = async function downloadImage(url, provider) {
  try {
    const response = await getPromisified({ url, encoding: null });
    handleRequestErrors(response, provider);
    return response.body;
  } catch (error) {
    throw error;
  }
};

const extractProfileImageUrl = async function extractProfileImageUrl(provider, profileUrl) {
  try {
    if (!provider || (provider !== 'instagram' && provider !== 'vimeo')) {
      throw new Error('Bad provider');
    }
    const response = await getPromisified({ url: profileUrl, encoding: null });
    handleRequestErrors(response, provider);
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
      throw new Error(`${provider} get avatar image url not found.`);
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
