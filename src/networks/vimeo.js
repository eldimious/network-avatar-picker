'use strict';

module.exports = class VimeoService {
  _createErrorMessage(error, defaultMsg) {
    return error && error.message ? error.message : defaultMsg;
  }

  getAvatar(username) {
    const url = `https://www.vimeo.com/${username}`;
    return this._avatarService.getViaOpenGraph(url, 'vimeo')
      .then(image => image)
      .catch(error =>  Promise.reject(error);
  }
};
