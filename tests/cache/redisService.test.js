const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const redisService = require('../../src/cache/redisService');
const profileImages = require('../mockedData/profileImages');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

let redisSrv;

describe('test redis service', () => {
  beforeEach(() => {
    redisSrv = redisService.init({
      host: '127.0.0.1',
      port: '6379'
    });
  });
  it('should return redisService as object', () => {
    expect(redisSrv).to.not.be.undefined;
    expect(redisSrv).to.be.an('object');
  });
  it('should redisService has getCachedValue as method', () => {
    expect(typeof(redisSrv.getCachedValue)).to.eql('function');
  });
  it('should avatarService has setCachedValue as method', () => {
    expect(typeof(redisSrv.setCachedValue)).to.eql('function');
  });
  describe('test getCachedValue method', async () => {
    it('should return undefined', async () => {
      const data = await redisSrv.getCachedValue('testKey1');
      expect(data).to.be.undefined;
    });
    it('should return value', async () => {
      await redisSrv.setCachedValue('testKey', 'testValue');
      const data = await redisSrv.getCachedValue('testKey');
      expect(data).to.eql('testValue');
    });
    it('should throw error missing redis client', async () => {
      const redis = redisService.init({});
      redis.getClient = () => undefined;
      await expect(redis.getCachedValue('testKey')).to.eventually.be.rejectedWith('No redis instance found');
    });
  });
  describe('test setCachedValue method', async () => {
    it('should set new value undefined', async () => {
      await redisSrv.setCachedValue('testKeyNew', 'testValue');
      const data = await redisSrv.getCachedValue('testKeyNew');
      expect(data).to.eql('testValue');
    });
    it('should return undefined because of missing redis client', async () => {
      const redis = redisService.init({});
      redis.getClient = () => undefined;
      expect(redis.setCachedValue('testKey')).to.be.undefined;
    });
  });
});
