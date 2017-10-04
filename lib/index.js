'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var networksFactory = require('./networks');

var NetworkAvatarPicker = function NetworkAvatarPicker() {
  _classCallCheck(this, NetworkAvatarPicker);

  var networksService = networksFactory.init();
  this.twitter = networksService.twitterService;
  this.instagram = networksService.instagramService;
  this.tumblr = networksService.tumblrService;
  this.vimeo = networksService.vimeoService;
  this.facebook = networksService.facebookService;
};

module.exports = NetworkAvatarPicker;