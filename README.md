# network-avatar-picker

> A npm module that returns as buffer a user's social network profile picture. This way, you can handle buffers and store them as images in your DB.

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

## Example

1) This way you will retrieve twitter's cnn account profile picture as buffer

```JavaScript
avatarPicker.twitter.getAvatar('cnn')
.then(buffer => {
  /*code*/
})
.catch(error => {
  /*code*/
});
```

