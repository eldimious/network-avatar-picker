const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const validationService = require('../../src/utils/validationService');

chai.use(chaiAsPromised);
const {
  expect,
} = chai;

let avatarPicker;

describe('validation service', () => {
  it('should return validationService as object', () => {
    expect(validationService).to.not.be.undefined;
    expect(validationService).to.be.an('object');
  });
  it('should validationService has validateUsernameInput as method', () => {
    expect(typeof(validationService.validateUsernameInput)).to.eql('function');
  });
  describe('test validateUsernameInput method', () => {
    it('should throw error - required username', async () => {
      expect(() => validationService.validateUsernameInput()).to.throw('Username required as input');
    });
    it('should throw error - username as string', async () => {
      expect(() => validationService.validateUsernameInput(1)).to.throw('Add username as string');
    });
  });
});
