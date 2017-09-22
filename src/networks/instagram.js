'use strict';

const Promise = require('bluebird');

module.exports = class InstagramService {
  constructor(avatarService) {
    this._avatarService = avatarService;
  }

  _createErrorMessage(error, defaultMsg) {
    return error && error.message ? error.message : defaultMsg;
  }

  getAvatar(username) {
    return this._avatarService.findImage(`https://www.instagram.com/${username}/`, 'instagram')
      .then(imageUrl => this._avatarService.getImage(imageUrl, 'instagram'))
      .then(response => response)
      .catch(error => Promise.reject(error));
  }
};
