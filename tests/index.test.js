const chai = require('chai');
const redis = require('redis-mock');
const chaiAsPromised = require('chai-as-promised');
const AvatarPickerService = require('../src');
const profileImages = require('./mockedData/profileImages');
const sinon = require('sinon');
const redisService = require('../src/cache/redisService');
console.log('xxxx', redisService)
chai.use(chaiAsPromised);
const {
  expect,
} = chai;

let avatarPicker;

describe('avatar picker module tests', () => {
  before(() => {
    sinon.stub(redisService, 'init').callsFake(() => {
      const client = redis.createClient();
      return Object.assign(Object.create({
        getCachedValue(key) {
          return new Promise((resolve, reject) => {
            const client = this.getClient();
            if (!client) reject(new Error('No redis instance found'));
            client.get(key, (err, data) => {
              if (data) return resolve(JSON.parse(data));
              return resolve();
            });
          });
        },
        setCachedValue(key, value) {
          const client = this.getClient();
          const ttl = this.getTTL();
          if (!client) return;
          const valueStr = JSON.stringify(value);
          client.set(key, valueStr);
          client.expire(key, ttl || TTL_REDIS);
        },
      }), {
        getClient() {
          return client;
        },
        getTTL() {
          return 10;
        },
      })
    });
  });
  beforeEach(() => {
    avatarPicker = new AvatarPickerService();
  });
  describe('test exported module', () => {
    it('should return avatarPicker as object', () => {
      expect(avatarPicker).to.not.be.undefined;
      expect(avatarPicker).to.be.an('object');
    });
    it('should avatarPicker has as properties supported methods', () => {
      expect(avatarPicker.facebook).to.be.an('object');
      expect(avatarPicker.github).to.be.an('object');
      expect(avatarPicker.gmail).to.be.an('object');
      expect(avatarPicker.instagram).to.be.an('object');
      expect(avatarPicker.tumblr).to.be.an('object');
      expect(avatarPicker.twitter).to.be.an('object');
      expect(avatarPicker.vimeo).to.be.an('object');
      expect(avatarPicker.youtube).to.be.an('object');
    });
    it('should each supported methods has getAvatar as method', () => {
      expect(typeof(avatarPicker.facebook.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.github.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.gmail.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.instagram.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.tumblr.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.twitter.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.vimeo.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.youtube.getAvatar)).to.eql('function');
    });
    it('should each supported methods has getAvatarUrl as method', () => {
      expect(typeof(avatarPicker.facebook.getAvatarUrl)).to.eql('function');
      expect(typeof(avatarPicker.github.getAvatarUrl)).to.eql('function');
      expect(typeof(avatarPicker.gmail.getAvatarUrl)).to.eql('function');
      expect(typeof(avatarPicker.instagram.getAvatarUrl)).to.eql('function');
      expect(typeof(avatarPicker.tumblr.getAvatarUrl)).to.eql('function');
      expect(typeof(avatarPicker.twitter.getAvatarUrl)).to.eql('function');
      expect(typeof(avatarPicker.vimeo.getAvatarUrl)).to.eql('function');
      expect(typeof(avatarPicker.youtube.getAvatarUrl)).to.eql('function');
    });
    it('should each supported methods has provider as property', () => {
      expect((avatarPicker.facebook.provider)).to.eql('facebook');
      expect((avatarPicker.github.provider)).to.eql('github');
      expect((avatarPicker.gmail.provider)).to.eql('gmail');
      expect((avatarPicker.instagram.provider)).to.eql('instagram');
      expect((avatarPicker.tumblr.provider)).to.eql('tumblr');
      expect((avatarPicker.twitter.provider)).to.eql('twitter');
      expect((avatarPicker.vimeo.provider)).to.eql('vimeo');
      expect((avatarPicker.youtube.provider)).to.eql('youtube');
    });
    it('should return correct url for each provider', async () => {
      const [
        fbProfileImageUrl,
        githubProfileImageUrl,
        gmailProfileImageUrl,
        instagramProfileImageUrl,
        tumblrProfileImageUrl,
        twitterProfileImageUrl,
        vimeoProfileImageUrl,
        youtubeProfileImageUrl,
      ] = await Promise.all([
        avatarPicker.facebook.getAvatarUrl('zuck'),
        avatarPicker.github.getAvatarUrl('eldimious'),
        avatarPicker.gmail.getAvatarUrl('botsaris.d@gmail.com'),
        avatarPicker.instagram.getAvatarUrl('cnn'),
        avatarPicker.tumblr.getAvatarUrl('tumblr'),
        avatarPicker.twitter.getAvatarUrl('el_dimious'),
        avatarPicker.vimeo.getAvatarUrl('cnn'),
        avatarPicker.youtube.getAvatarUrl('cnn'),
      ]);
      expect(fbProfileImageUrl
        .split('?')[0]
        .split('fbcdn.net/')[1]
        .split('.jpg')[0]
        .split('/')
        .pop()
      ).to.equal(profileImages.facebook.profileImageUrl);
      expect(githubProfileImageUrl).to.equal(profileImages.github.profileImageUrl);
      expect(gmailProfileImageUrl).to.equal(profileImages.gmail.profileImageUrl);
      expect(instagramProfileImageUrl
        .split('?')[0]
        .split('cdninstagram.com/')[1]
        .split('.jpg')[0]
        .split('/')
        .pop()
      ).to.equal(profileImages.instagram.profileImageUrl);
      expect(tumblrProfileImageUrl).to.equal(profileImages.tumblr.profileImageUrl);
      expect(twitterProfileImageUrl).to.equal(profileImages.twitter.profileImageUrl);
      expect(vimeoProfileImageUrl).to.equal(profileImages.vimeo.profileImageUrl);
      expect(youtubeProfileImageUrl).to.equal(profileImages.youtube.profileImageUrl);
    });
    it('should return image for each provider', async () => {
      const [
        fbProfileImage,
        githubProfileImage,
        gmailProfileImage,
        instagramProfileImage,
        tumblrProfileImage,
        twitterProfileImage,
        vimeoProfileImage,
        youtubeProfileImage,
      ] = await Promise.all([
        avatarPicker.facebook.getAvatar('zuck'),
        avatarPicker.github.getAvatar('eldimious'),
        avatarPicker.gmail.getAvatar('botsaris.d@gmail.com'),
        avatarPicker.instagram.getAvatar('cnn'),
        avatarPicker.tumblr.getAvatar('tumblr'),
        avatarPicker.twitter.getAvatar('el_dimious'),
        avatarPicker.vimeo.getAvatar('cnn'),
        avatarPicker.youtube.getAvatar('cnn'),
      ]);
      expect(Buffer.from(fbProfileImage).toString('base64')).to.equal(profileImages.facebook.imageBase64);
      expect(Buffer.from(githubProfileImage).toString('base64')).to.equal(profileImages.github.imageBase64);
      expect(Buffer.from(gmailProfileImage).toString('base64')).to.equal(profileImages.gmail.imageBase64);
      expect(Buffer.from(instagramProfileImage).toString('base64')).to.equal(profileImages.instagram.imageBase64);
      expect(Buffer.from(tumblrProfileImage).toString('base64')).to.equal(profileImages.tumblr.imageBase64);
      expect(Buffer.from(twitterProfileImage).toString('base64')).to.equal(profileImages.twitter.imageBase64);
      expect(Buffer.from(vimeoProfileImage).toString('base64')).to.equal(profileImages.vimeo.imageBase64);
      expect(Buffer.from(youtubeProfileImage).toString('base64')).to.equal(profileImages.youtube.imageBase64);
    });
    it('should return image for each provider using caching', async () => {
      const avatarPickerCaching = new AvatarPickerService({
        redis: {
          host: '127.0.0.1',
          port: '6379',
          ttl: 15,
        }
      });
      const [
        fbProfileImage
      ] = await Promise.all([
        avatarPickerCaching.facebook.getAvatar('BillGates'),
      ]);
      expect(Buffer.from(fbProfileImage).toString('base64')).to.equal(profileImages.facebook.imageBase64Alt);
      const [
        fbProfileImageCaching
      ] = await Promise.all([
        avatarPickerCaching.facebook.getAvatar('BillGates'),
      ]);
      expect(Buffer.from(fbProfileImageCaching).toString('base64')).to.equal(profileImages.facebook.imageBase64Alt);
    });
    it('should return correct url for each provider using caching', async () => {
      const avatarPickerCaching = new AvatarPickerService({
        redis: {
          host: '127.0.0.1',
          port: '6379',
          ttl: 15,
        }
      });
      const [
        fbProfileUrl,
        instagramProfileUrl,
        youtubeProfileUrl,
        vimeoProfileUrl,
      ] = await Promise.all([
        avatarPickerCaching.facebook.getAvatarUrl('apple'),
        avatarPickerCaching.instagram.getAvatarUrl('nike'),
        avatarPickerCaching.youtube.getAvatarUrl('ChromeDevelopers'),
        avatarPickerCaching.vimeo.getAvatarUrl('JavaZone'),
      ]);
      expect(fbProfileUrl
        .split('?')[0]
        .split('fbcdn.net/')[1]
        .split('.jpg')[0]
        .split('/')
        .pop()
      ).to.equal(profileImages.facebook.profileImageUrlAlt);
      expect(instagramProfileUrl
        .split('?')[0]
        .split('cdninstagram.com/')[1]
        .split('.jpg')[0]
        .split('/')
        .pop()
      ).to.equal(profileImages.instagram.profileImageUrlAlt);
      expect(youtubeProfileUrl).to.equal(profileImages.youtube.profileImageUrlAlt);
      expect(vimeoProfileUrl).to.equal(profileImages.vimeo.profileImageUrlAlt);
      const [
        fbProfileUrlFromCaching,
        instagramProfileUrlFromCaching,
        youtubeProfileUrlFromCaching,
        vimeoProfileUrlFromCaching,
      ] = await Promise.all([
        avatarPickerCaching.facebook.getAvatarUrl('apple'),
        avatarPickerCaching.instagram.getAvatarUrl('nike'),
        avatarPickerCaching.youtube.getAvatarUrl('ChromeDevelopers'),
        avatarPickerCaching.vimeo.getAvatarUrl('JavaZone'),
      ]);
      expect(fbProfileUrlFromCaching
        .split('?')[0]
        .split('fbcdn.net/')[1]
        .split('.jpg')[0]
        .split('/')
        .pop()
      ).to.equal(profileImages.facebook.profileImageUrlAlt);
      expect(instagramProfileUrlFromCaching
        .split('?')[0]
        .split('cdninstagram.com/')[1]
        .split('.jpg')[0]
        .split('/')
        .pop()
      ).to.equal(profileImages.instagram.profileImageUrlAlt);
      expect(youtubeProfileUrlFromCaching).to.equal(profileImages.youtube.profileImageUrlAlt);
      expect(vimeoProfileUrlFromCaching).to.equal(profileImages.vimeo.profileImageUrlAlt);
    });
    it('should return throw error missing username', async () => {
      await expect(avatarPicker.facebook.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.github.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.gmail.getAvatar()).to.eventually.be.rejectedWith('Gmail required as input');
      await expect(avatarPicker.instagram.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.tumblr.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.twitter.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.vimeo.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.youtube.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
    });
  });
});
