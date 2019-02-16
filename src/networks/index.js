const cheerio = require('cheerio');
const avatarServiceFactory = require('../utils/avatarService');
const {
  getPromisified,
} = require('../utils/requestService');
const {
  handleRequestErrors,
} = require('../utils/errorsService');

const getImageUrl = (type, username) => {
  if (type === 'twitter') {
    return `https://twitter.com/${username}/profile_image?size=original`;
  }
  if (type === 'tumblr') {
    return `https://api.tumblr.com/v2/blog/${username}/avatar`;
  }
  if (type === 'facebook') {
    return `https://graph.facebook.com/${username}/picture?type=large`;
  }
};


const extractImageUrl = async function extractImageUrl(url, network) {
  try {
    const response = await getPromisified({ url, encoding: null });
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


const getUserProfileUrl = (type, username) => `https://www.${type}.com/${username}`;


const picker = {
  async getAvatar(username) {
    try {
      const type = this.getNetworkType();
      const imageUrl = type === 'vimeo' || type === 'instagram'
        ? await extractImageUrl(getUserProfileUrl(type, username), type)
        : getImageUrl(type, username);
      return this.avatarService.downloadImage(imageUrl, type);
    } catch (error) {
      throw error;
    }
  },
};


module.exports.init = (type) => {
  const avatarService = avatarServiceFactory.init();
  return Object.assign(Object.create(picker), {
    getNetworkType() {
      return type;
    },
    avatarService,
  });
};
