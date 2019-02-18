const cheerio = require('cheerio');
const {
  downloadImage,
} = require('../utils/avatarService');
const {
  getPromisified,
} = require('../utils/requestService');
const {
  handleRequestErrors,
} = require('../utils/errorsService');

const getImageUrl = (network, username) => {
  if (network === 'twitter') {
    return `https://twitter.com/${username}/profile_image?size=original`;
  } else if (network === 'tumblr') {
    return `https://api.tumblr.com/v2/blog/${username}/avatar`;
  } else if (network === 'facebook') {
    return `https://graph.facebook.com/${username}/picture?type=large`;
  }
  throw new Error('Bad network');
};

const getUserProfileUrl = (network, username) => `https://www.${network}.com/${username}`;

const extractProfileImageUrl = async function extractProfileImageUrl(network, username) {
  try {
    if (!network || (network !== 'instagram' && network !== 'vimeo')) {
      throw new Error('Bad network');
    }
    const profileUrl = getUserProfileUrl(network, username);
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

const picker = {
  async getAvatar(username) {
    try {
      const network = this.getNetworkType();
      const imageUrl = network === 'vimeo' || network === 'instagram'
        ? await extractProfileImageUrl(network, username)
        : getImageUrl(network, username);
      return downloadImage(imageUrl, network);
    } catch (error) {
      throw error;
    }
  },
};

module.exports.init = type => Object.assign(Object.create(picker), {
  getNetworkType() {
    return type;
  },
});
