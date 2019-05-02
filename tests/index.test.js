const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const AvatarPickerService = require('../src');

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
  });
});
