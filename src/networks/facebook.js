const Promise = require('bluebird');

module.exports = class InstagramService {
  constructor(avatarService) {
    this._avatarService = avatarService;
  }

  getAvatar(username) {
    return this._avatarService.getImage(`https://graph.facebook.com/${username}/picture?type=large`, 'facebook')
      .then(response => response)
      .catch(error => Promise.reject(error));
  }
};
