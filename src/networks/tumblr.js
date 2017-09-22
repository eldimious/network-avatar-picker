'use strict';

module.exports = class TumblrService {
  constructor(avatarService) {
    this._avatarService = avatarService;
  }

  _createErrorMessage(error, defaultMsg) {
    return error && error.message ? error.message : defaultMsg;
  }

  getAvatar(username) {
    const url = `https://api.tumblr.com/v2/blog/${username}/avatar`;
    return this._avatarService.get(url, 'tumblr')
      .then(image => image)
      .catch(error =>  Promise.reject(error);
  }
};
