const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const avatarService = require('../../src/utils/avatarService');
const profileImages = require('../mockedData/profileImages');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

let avatarPicker;

describe('test avatar service', () => {
  it('should return avatarService as object', () => {
    expect(avatarService).to.not.be.undefined;
    expect(avatarService).to.be.an('object');
  });
  it('should avatarService has downloadImage as method', () => {
    expect(typeof(avatarService.downloadImage)).to.eql('function');
  });
  it('should avatarService has extractProfileImageUrl as method', () => {
    expect(typeof(avatarService.extractProfileImageUrl)).to.eql('function');
  });
  describe('test extractProfileImageUrl method', () => {
    it('should return profile url', async () => {
      const [
        instagramProfileUrl,
        facebookProfileUrl,
        vimeoProfileUrl,
        youtubeProfileUrl,
      ] = await Promise.all([
        avatarService.extractProfileImageUrl('https://www.instagram.com/cnn', 'instagram'),
        avatarService.extractProfileImageUrl('https://mobile.facebook.com/zuck', 'facebook'),
        avatarService.extractProfileImageUrl('https://www.vimeo.com/cnn', 'vimeo'),
        avatarService.extractProfileImageUrl('https://www.youtube.com/user/cnn', 'youtube'),
      ]);
      expect(instagramProfileUrl.split('?')[0]).to.equal(profileImages.instagram.profileImageUrl);
      expect(facebookProfileUrl.split('?')[0]).to.equal(profileImages.facebook.profileImageUrl);
      expect(vimeoProfileUrl).to.equal(profileImages.vimeo.profileImageUrl);
      expect(youtubeProfileUrl).to.equal(profileImages.youtube.profileImageUrl);
    });
  });
});
