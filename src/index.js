'use strict';

const networksFactory = require('./networks');

class NetworkAvatarPicker {
  constructor() {
    const networksService = networksFactory.init();
    this.twitter = networksService.twitterService;
    this.instagram = networksService.instagramService;
    this.tumblr = networksService.tumblrService;
    this.vimeo = networksService.vimeoService;
    this.facebook = networksService.facebookService;
  }
}

module.exports = function() {
  const avatarPicker = new NetworkAvatarPicker();
  return avatarPicker;
};
