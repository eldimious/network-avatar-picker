# network-avatar-picker

> A npm module that returns as buffer a user's social network profile picture. You can choose among twitter, instagram, tumblr, vimeo and facebook and just send a username.

## Supported Providers

- facebook
- github
- instagram
- tumblr
- twitter
- vimeo
- youtube

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

1) This way you will retrieve twitter's cnn account profile picture as buffer

```JavaScript
const AvatarPickerService = require('network-avatar-picker');
const avatarPicker = new AvatarPickerService();
(async () => {
    try {
      const buffer = await avatarPicker.twitter.getAvatar('cnn');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```
