'use strict';

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
      .then(image => image)
      .catch(error =>  Promise.reject(error);
  }
};
