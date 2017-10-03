'use strict';

var TwitterServiceFactory = require('./twitter');
var InstagramServiceFactory = require('./instagram');
var TumblrServiceFactory = require('./tumblr');
var VimeoServiceFactory = require('./vimeo');
var FacebookServiceFactory = require('./facebook');
var avatarServiceFactory = require('../helper/avatarService');

function init() {
  var avatarService = avatarServiceFactory.init();
  var twitterService = new TwitterServiceFactory(avatarService);
  var instagramService = new InstagramServiceFactory(avatarService);
  var tumblrService = new TumblrServiceFactory(avatarService);
  var vimeoService = new VimeoServiceFactory(avatarService);
  var facebookService = new FacebookServiceFactory(avatarService);

  return {
    twitterService: twitterService,
    instagramService: instagramService,
    tumblrService: tumblrService,
    vimeoService: vimeoService,
    facebookService: facebookService
  };
}

module.exports.init = init;