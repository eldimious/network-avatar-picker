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

const extractProfileImageUrl = async function extractProfileImageUrl(profileUrl, provider) {
  try {
    if (!provider) {
      throw new Error('Bad provider');
    }
    const response = await getPromisified({
      url: profileUrl,
      headers: {
        'User-Agent': 'request',
      },
      encoding: null,
    });
    handleRequestErrors(response, provider);
    const $ = cheerio.load(response.body);
    const ogImage = $('meta[property="og:image"]').attr('content');
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
