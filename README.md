# network-avatar-picker

> A npm module that returns a user's avatar from his social networks. You can choose among Facebook, Twitter, Instagram, Tumblr, Vimeo, Github and Youtube. Then, you just need to pass a username **without the need of token or API keys** and retrieve user's social network profile picture!


[![npm version](https://badge.fury.io/js/network-avatar-picker.svg)](https://badge.fury.io/js/network-avatar-picker) [![Build Status](https://travis-ci.org/eldimious/network-avatar-picker.svg?branch=master)](https://travis-ci.org/eldimious/network-avatar-picker) [![Coverage Status](https://coveralls.io/repos/github/eldimious/network-avatar-picker/badge.svg?branch=master)](https://coveralls.io/github/eldimious/network-avatar-picker?branch=master)

## Supported Providers

- Facebook
- Github
- Instagram
- Tumblr
- Twitter
- Vimeo
- Youtube

## Usage

First, install `network-avatar-picker` as a dependency:

```shell
npm install --save network-avatar-picker
```

Then you should require in order to be able use it:

```javascript
const AvatarPickerService = require('network-avatar-picker');
const avatarPicker = new AvatarPickerService();
```

Use the methods of the `avatarPicker` class to get user avatars from networks:
- `avatarPicker.twitter.getAvatar(username)`
- `avatarPicker.instagram.getAvatar(username)`
- `avatarPicker.tumblr.getAvatar(username)`
- `avatarPicker.vimeo.getAvatar(username)`
- `avatarPicker.facebook.getAvatar(username)`
- `avatarPicker.github.getAvatar(username)`
- `avatarPicker.youtube.getAvatar(username)`

## Example

1) This way you will retrieve **twitter's** cnn user profile picture:

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.twitter.getAvatar('cnn');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```

2) This way you will retrieve **facebook's** zuck user profile picture:

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.facebook.getAvatar('zuck');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```

3) This way you will retrieve **instagram's** cnn user profile picture:

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.instagram.getAvatar('cnn');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```
