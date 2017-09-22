'use strict';

const Promise = require('bluebird');

module.exports = class TwitterService {
  constructor(avatarService) {
    this._avatarService = avatarService;
  }

  _createErrorMessage(error, defaultMsg) {
    return error && error.message ? error.message : defaultMsg;
  }

  getAvatar(username) {
    const url = `https://twitter.com/${username}/profile_image?size=original`;
    return this._avatarService.get(url, 'twitter')
      .then(response => response.body)
      .catch(error => Promise.reject(error));
  }
};
