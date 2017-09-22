'use strict';

const Promise = require('bluebird');

module.exports = class TumblrService {
  constructor(avatarService) {
    this._avatarService = avatarService;
  }

  _createErrorMessage(error, defaultMsg) {
    return error && error.message ? error.message : defaultMsg;
  }

  getAvatar(username) {
    return this._avatarService.getImage(`https://api.tumblr.com/v2/blog/${username}/avatar`, 'tumblr')
      .then(buffer => buffer)
      .catch(error => Promise.reject(error));
  }
};
