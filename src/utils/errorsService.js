const handleRequestErrors = (response, network) => {
  if (response.statusCode !== 200) {
    throw new Error(`Get ${network} avatar failed with status: ${response.statusCode}.`);
  }
  if (!response.body) {
    throw new Error(`Get ${network} avatar unable find image.`);
  }
  if (network === 'twitter' && response.headers && response.headers['content-type'] && response.headers['content-type'].includes('text/html')) {
    throw new Error(`Get ${network} avatar no response body.`);
  }
};


module.exports = {
  handleRequestErrors,
};
