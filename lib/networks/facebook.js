'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('bluebird');

module.exports = function () {
  function InstagramService(avatarService) {
    _classCallCheck(this, InstagramService);

    this._avatarService = avatarService;
  }

  _createClass(InstagramService, [{
    key: '_createErrorMessage',
    value: function _createErrorMessage(error, defaultMsg) {
      return error && error.message ? error.message : defaultMsg;
    }
  }, {
    key: 'getAvatar',
    value: function getAvatar(username) {
      return this._avatarService.getImage('https://graph.facebook.com/' + username + '/picture?type=large', 'facebook').then(function (response) {
        return response;
      }).catch(function (error) {
        return Promise.reject(error);
      });
    }
  }]);

  return InstagramService;
}();