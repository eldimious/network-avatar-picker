const TwitterService = require('./twitter');
const InstagramService = require('./instagram');
const TumblrService = require('./tumblr');
const VimeoService = require('./vimeo');
const FacebookService = require('./facebook');
const avatarServiceFactory = require('../utils/avatarService');

function init() {
  const avatarService = avatarServiceFactory.init();
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

module.exports.init = init;
