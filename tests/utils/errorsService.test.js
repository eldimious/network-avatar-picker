const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const errorsService = require('../../src/utils/errorsService');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

let avatarPicker;

describe('test error service', () => {
  it('should return errorsService as object', () => {
    expect(errorsService).to.not.be.undefined;
    expect(errorsService).to.be.an('object');
  });
  it('should errorsService has handleRequestErrors as method', () => {
    expect(typeof(errorsService.handleRequestErrors)).to.eql('function');
  });
  describe('test handleRequestErrors method', () => {
    it('should throw error - failed with status', async () => {
      const response = {
        statusCode: 400,
      }
      expect(() => errorsService.handleRequestErrors(response, 'twitter')).to.throw('Get twitter avatar failed with status: 400.');
    });
    it('should throw error - missing body', async () => {
      const response = {
        statusCode: 200,
      }
      expect(() => errorsService.handleRequestErrors(response, 'twitter')).to.throw('Get twitter avatar unable find image.');
    });
    it('should throw error for twitter', async () => {
      const response = {
        headers: {
          'content-type': 'text/html',
        },
        body: 'test',
        statusCode: 200,
      }
      expect(() => errorsService.handleRequestErrors(response, 'twitter')).to.throw('Get twitter avatar no response body.');
    });
  });
});
