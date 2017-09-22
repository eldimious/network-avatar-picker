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
      .then(image => image)
      .catch(error => Promise.reject(error));
  }
};
