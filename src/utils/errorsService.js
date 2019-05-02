const handleRequestErrors = (response, provider) => {
  if (response.statusCode !== 200) {
    throw new Error(`Get ${provider} avatar failed with status: ${response.statusCode}.`);
  }
  if (!response.body) {
    throw new Error(`Get ${provider} avatar unable find image.`);
  }
  if (provider === 'twitter' && response.headers && response.headers['content-type'] && response.headers['content-type'].includes('text/html')) {
    throw new Error(`Get ${provider} avatar no response body.`);
  }
};


module.exports = {
  handleRequestErrors,
};
