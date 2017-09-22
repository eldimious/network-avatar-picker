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
    const url = `https://www.instagram.com/${username}/`;
    return this._avatarService.getViaOpenGraph(url, 'instagram')
      .then(imageUrl => this._getImageBuffer(imageUrl))
      .then(response => response)
      .catch(error => Promise.reject(error));
  }

  _getImageBuffer(imageUrl) {
    return this._avatarService.get(imageUrl, 'instagram')
      .then(buffer => ({ imageBuffer: buffer, imageUrl }))
      .catch(error => Promise.reject(error));
  }
};
