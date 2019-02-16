const {
  getPromisified,
} = require('../utils/requestService');
const {
  handleRequestErrors,
} = require('../utils/errorsService');

function init() {
  const downloadImage = async function downloadImage(url, network) {
    try {
      const response = await getPromisified({ url, encoding: null });
      handleRequestErrors(response, network);
      if (network === 'twitter' && response.headers && response.headers['content-type'] && response.headers['content-type'].includes('text/html')) {
        throw new Error(`Get ${network} avatar no response body.`);
      }
      return response.body;
    } catch (error) {
      throw error;
    }
  };

  return Object.freeze({
    downloadImage,
  });
}

module.exports.init = init;
