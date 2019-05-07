const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const common = require('../../src/utils/common');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;


describe('test for common file', () => {
  it('should return common as object', () => {
    expect(common).to.not.be.undefined;
    expect(common).to.be.an('object');
  });
  it('should common has md5 as method', () => {
    expect(typeof(common.md5)).to.eql('function');
  });
  it('should common has properties', () => {
    expect(typeof(common.FACEBOOK)).to.eql('string');
    expect(typeof(common.GITHUB)).to.eql('string');
    expect(typeof(common.GMAIL)).to.eql('string');
    expect(typeof(common.TUMBLR)).to.eql('string');
    expect(typeof(common.TWITTER)).to.eql('string');
    expect(typeof(common.VIMEO)).to.eql('string');
    expect(typeof(common.YOUTUBE)).to.eql('string');
    expect(typeof(common.TTL_REDIS)).to.eql('number');
  });
  it('should common has constants properties', () => {
    expect((common.FACEBOOK)).to.eql('facebook');
    expect((common.GITHUB)).to.eql('github');
    expect((common.GMAIL)).to.eql('gmail');
    expect((common.TUMBLR)).to.eql('tumblr');
    expect((common.TWITTER)).to.eql('twitter');
    expect((common.VIMEO)).to.eql('vimeo');
    expect((common.YOUTUBE)).to.eql('youtube');
    expect((common.TTL_REDIS)).to.eql(3600);
  });
  describe('test md5 method', () => {
    it('should return correct output', () => {
      expect(common.md5('botsaris.d@gmail.com')).to.eql('db35cedc94bc259282e658234a256c59');
    });
  });

});
