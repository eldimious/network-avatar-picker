# network-avatar-picker

> A npm module that returns a user's avatar from his social networks as Buffer or as URL. You can choose among Facebook, Twitter, Instagram, Tumblr, Vimeo, Github, Gmail and Youtube provider. Then, you just need to pass a username **without the need of token or API keys** and retrieve user's social network profile picture!


[![npm version](https://badge.fury.io/js/network-avatar-picker.svg)](https://badge.fury.io/js/network-avatar-picker) [![Build Status](https://travis-ci.org/eldimious/network-avatar-picker.svg?branch=master)](https://travis-ci.org/eldimious/network-avatar-picker) [![Coverage Status](https://coveralls.io/repos/github/eldimious/network-avatar-picker/badge.svg?branch=master)](https://coveralls.io/github/eldimious/network-avatar-picker?branch=master)

## Supported Providers

- Facebook
- Github
- Gmail
- Instagram
- Tumblr
- Twitter
- Vimeo
- Youtube

## Getting Started

### Installing

First, install `network-avatar-picker` as a dependency:

```shell
npm install --save network-avatar-picker
```

### Usage

#### Basic configuration

You should require the dependency in order to be able use it:

```javascript
const NetworkAvatarPicker = require('network-avatar-picker');
const avatarPicker = new NetworkAvatarPicker();
```

#### Cache configuration using Redis

In **1.4.0** we have introduced support to cache results with Redis! Just pass redis config as param to the NetworkAvatarPicker and it will create a new redis client. Then, we will store the images and avatar's URL to redis.

```javascript
const NetworkAvatarPicker = require('network-avatar-picker');
const avatarPicker = new NetworkAvatarPicker({
  redis: {
    host: '127.0.0.1', // required
    port: '6379', // required
    password  : 'your password',    // optional: replace with your password
    ttl: 3600, // optional: Add your expiration caching time in seconds. Default value: 3600
  }
});
```

This way we create a local Redis client with expiration caching time 3600sec.

### Methods

Use the `async` methods of the `avatarPicker` instance to fetch user avatars:

A) **getAvatar**: Fetch avatar image as **Buffer**

- `avatarPicker.facebook.getAvatar(username)`
- `avatarPicker.twitter.getAvatar(username)`
- `avatarPicker.instagram.getAvatar(username)`
- `avatarPicker.tumblr.getAvatar(username)`
- `avatarPicker.vimeo.getAvatar(username)`
- `avatarPicker.github.getAvatar(username)`
- `avatarPicker.youtube.getAvatar(username)`
- `avatarPicker.gmail.getAvatar(email)`

B) **getAvatarUrl**: Fetch avatar image as **URL**

- `avatarPicker.facebook.getAvatarUrl(username)`
- `avatarPicker.twitter.getAvatarUrl(username)`
- `avatarPicker.instagram.getAvatarUrl(username)`
- `avatarPicker.tumblr.getAvatarUrl(username)`
- `avatarPicker.vimeo.getAvatarUrl(username)`
- `avatarPicker.github.getAvatarUrl(username)`
- `avatarPicker.youtube.getAvatarUrl(username)`
- `avatarPicker.gmail.getAvatarUrl(email)`


## Examples

1) Fetch **twitter's** cnn user profile picture:

**Buffer**: 

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.twitter.getAvatar('cnn');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```

**URL**:

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.twitter.getAvatarUrl('cnn');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```

2) Fetch **facebook's** zuck user profile picture:

**Buffer**:

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.facebook.getAvatar('zuck');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```

**URL**:

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.facebook.getAvatarUrl('zuck');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```

3) Fetch **instagram's** cnn user profile picture:

**Buffer**:

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.instagram.getAvatar('cnn');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```

**URL**:

```JavaScript
(async () => {
    try {
      const res = await avatarPicker.instagram.getAvatarUrl('cnn');
    } catch (e) {
      // Deal with the fact the chain failed
    }
})();
```

## Running the tests

In order to run tests you have to run:

```shell
npm run tests
```
