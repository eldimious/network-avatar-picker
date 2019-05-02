const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const AvatarPickerService = require('../src');
const profileImages = require('./mockedData/profileImages');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

let avatarPicker;

describe('authentication module tests', () => {
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
      expect(avatarPicker.instagram).to.be.an('object');
      expect(avatarPicker.tumblr).to.be.an('object');
      expect(avatarPicker.twitter).to.be.an('object');
      expect(avatarPicker.vimeo).to.be.an('object');
      expect(avatarPicker.youtube).to.be.an('object');
    });
    it('should each supported methods has getAvatar as method', () => {
      expect(typeof(avatarPicker.facebook.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.github.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.instagram.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.tumblr.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.twitter.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.vimeo.getAvatar)).to.eql('function');
      expect(typeof(avatarPicker.youtube.getAvatar)).to.eql('function');
    });
    it('should each supported methods has getUrl as method', () => {
      expect(typeof(avatarPicker.facebook.getUrl)).to.eql('function');
      expect(typeof(avatarPicker.github.getUrl)).to.eql('function');
      expect(typeof(avatarPicker.instagram.getUrl)).to.eql('function');
      expect(typeof(avatarPicker.tumblr.getUrl)).to.eql('function');
      expect(typeof(avatarPicker.twitter.getUrl)).to.eql('function');
      expect(typeof(avatarPicker.vimeo.getUrl)).to.eql('function');
      expect(typeof(avatarPicker.youtube.getUrl)).to.eql('function');
    });
    it('should return correct url for each provider', async () => {
      expect(avatarPicker.facebook.getUrl('zuck')).to.equal('https://mobile.facebook.com/zuck');
      expect(avatarPicker.github.getUrl('eldimious')).to.equal('https://github.com/eldimious.png');
      expect(avatarPicker.instagram.getUrl('cnn')).to.equal('https://www.instagram.com/cnn');
      expect(avatarPicker.tumblr.getUrl('tumblr')).to.equal('https://api.tumblr.com/v2/blog/tumblr/avatar');
      expect(avatarPicker.twitter.getUrl('el_dimious')).to.equal('https://twitter.com/el_dimious/profile_image?size=original');
      expect(avatarPicker.vimeo.getUrl('cnn')).to.equal('https://www.vimeo.com/cnn');
      expect(avatarPicker.youtube.getUrl('cnn')).to.equal('https://www.youtube.com/user/cnn');
    });
    it('should return image for each provider', async () => {
      const [
        fbProfileImage,
        githubProfileImage,
        instagramProfileImage,
        tumblrProfileImage,
        twitterProfileImage,
        vimeoProfileImage,
        youtubeProfileImage,
      ] = await Promise.all([
        avatarPicker.facebook.getAvatar('zuck'),
        avatarPicker.github.getAvatar('eldimious'),
        avatarPicker.instagram.getAvatar('cnn'),
        avatarPicker.tumblr.getAvatar('tumblr'),
        avatarPicker.twitter.getAvatar('el_dimious'),
        avatarPicker.vimeo.getAvatar('cnn'),
        avatarPicker.youtube.getAvatar('cnn'),
      ]);
      expect(Buffer.from(fbProfileImage).toString('base64')).to.equal(profileImages.facebook.imageBase64);
      expect(Buffer.from(githubProfileImage).toString('base64')).to.equal(profileImages.github.imageBase64);
      expect(Buffer.from(instagramProfileImage).toString('base64')).to.equal(profileImages.instagram.imageBase64);
      expect(Buffer.from(tumblrProfileImage).toString('base64')).to.equal(profileImages.tumblr.imageBase64);
      expect(Buffer.from(twitterProfileImage).toString('base64')).to.equal(profileImages.twitter.imageBase64);
      expect(Buffer.from(vimeoProfileImage).toString('base64')).to.equal(profileImages.vimeo.imageBase64);
      expect(Buffer.from(youtubeProfileImage).toString('base64')).to.equal(profileImages.youtube.imageBase64);
    });
    it('should return throw error missing username', async () => {
      await expect(avatarPicker.facebook.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.github.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.instagram.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.tumblr.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.twitter.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.vimeo.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
      await expect(avatarPicker.youtube.getAvatar()).to.eventually.be.rejectedWith('Username required as input');
    });
  });
});
