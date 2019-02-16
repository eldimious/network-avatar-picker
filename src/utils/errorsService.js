const handleRequestErrors = (response, network) => {
  if (response.statusCode !== 200) {
    throw new Error(`Get ${network} avatar failed with status: ${response.statusCode}.`);
  }
  if (!response.body) {
    throw new Error(`Get ${network} avatar unable find image.`);
  }
};

module.exports = {
  handleRequestErrors,
};
