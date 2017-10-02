# network-avatar-picker

> A npm module that returns as buffer a user's social network profile picture.

## Usage

First, install `network-avatar-picker` as a dependency:

```shell
npm install --save network-avatar-picker
```

Then you should require in order to be able use it:

```javascript
const avatarPicker = require('network-avatar-picker');
```

Use the methods of the `avatarPicker` class to get user avatars from networks:
- `avatarPicker.twitter.getAvatar(username)`
- `avatarPicker.instagram.getAvatar(username)`
- `avatarPicker.tumblr.getAvatar(username)`
- `avatarPicker.vimeo.getAvatar(username)`
- `avatarPicker.facebook.getAvatar(username)`
