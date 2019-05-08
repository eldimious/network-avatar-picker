const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const hashService = require('../../src/utils/hashService');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;


describe('test hash service', () => {
  it('should return hashService as object', () => {
    expect(hashService).to.not.be.undefined;
    expect(hashService).to.be.an('object');
  });
  it('should hashService has md5 as method', () => {
    expect(typeof(hashService.md5)).to.eql('function');
  });
  describe('test md5 method', () => {
    it('should return correct output', () => {
      expect(hashService.md5('botsaris.d@gmail.com')).to.eql('db35cedc94bc259282e658234a256c59');
    });
  });
});
