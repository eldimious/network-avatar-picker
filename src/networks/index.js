const TwitterService = require('./twitter');
const InstagramService = require('./instagram');
const TumblrService = require('./tumblr');
const VimeoService = require('./vimeo');
const FacebookService = require('./facebook');
const avatarServiceFactory = require('../utils/avatarService');

const picker = {
  async getAvatar(type, username) {
    try {
      const imageUrl = await this._avatarService.findImage(`https://www.instagram.com/${username}/`, 'instagram');
      return this._avatarService.getImage(imageUrl, 'instagram');
    } catch (error) {
      throw error;
    }
  },
};

function init() {
  const avatarService = avatarServiceFactory.init();

  const getAvatar = async function getAvatar(type, username) {
    try {
      const imageUrl = await this.avatarService.findImage(`https://www.instagram.com/${username}/`, 'instagram');
      return this.avatarService.getImage(imageUrl, 'instagram');
    } catch (error) {
      throw error;
    }
  };

  const twitterService = new TwitterService(avatarService);
  const instagramService = new InstagramService(avatarService);
  const tumblrService = new TumblrService(avatarService);
  const vimeoService = new VimeoService(avatarService);
  const facebookService = new FacebookService(avatarService);

  return ({
    twitterService,
    instagramService,
    tumblrService,
    vimeoService,
    facebookService,
  });
}

module.exports = () => (type) => {
  console.log('1111', type)
  const avatarService = avatarServiceFactory.init();
  return Object.assign(Object.create(picker), {
    getNetworkType() {
      return type;
    },
    avatarService,
  });
};
module.exports.init = init;
