const Promise = require('bluebird');

module.exports = class TwitterService {
  constructor(avatarService) {
    this._avatarService = avatarService;
  }

  getAvatar(username) {
    return this._avatarService.getImage(`https://twitter.com/${username}/profile_image?size=original`, 'twitter')
      .then(buffer => buffer)
      .catch(error => Promise.reject(error));
  }
};
