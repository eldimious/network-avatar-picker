'use strict';

const TwitterServiceFactory = require('./twitter');
const InstagramServiceFactory = require('./instagram');
const TumblrServiceFactory = require('./tumblr');
const VimeoServiceFactory = require('./vimeo');
const FacebookServiceFactory = require('./facebook');
const avatarServiceFactory = require('../helper/avatarService');

function init() {
  const avatarService = avatarServiceFactory.init();
  const twitterService = new TwitterServiceFactory(avatarService);
  const instagramService = new InstagramServiceFactory(avatarService);
  const tumblrService = new TumblrServiceFactory(avatarService);
  const vimeoService = new VimeoServiceFactory(avatarService);
  const facebookService = new FacebookServiceFactory(avatarService);

  return ({
    twitterService,
    instagramService,
    tumblrService,
    vimeoService,
    facebookService,
  });
}

module.exports.init = init;
