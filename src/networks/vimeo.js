'use strict';

const Promise = require('bluebird');

module.exports = class VimeoService {
  constructor(avatarService) {
    this._avatarService = avatarService;
  }

  _createErrorMessage(error, defaultMsg) {
    return error && error.message ? error.message : defaultMsg;
  }

  getAvatar(username) {
    const url = `https://www.vimeo.com/${username}`;
    return this._avatarService.getViaOpenGraph(url, 'vimeo')
      .then(imageUrl => this._getImageBuffer(imageUrl))
      .then(response => response)
      .catch(error => Promise.reject(error));
  }

  _getImageBuffer(imageUrl) {
    return this._avatarService.get(imageUrl, 'vimeo')
      .then(buffer => buffer)
      .catch(error => Promise.reject(error));
  }
};
