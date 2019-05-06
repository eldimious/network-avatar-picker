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
  it('should validationService has validateEmail as method', () => {
    expect(typeof(validationService.validateEmail)).to.eql('function');
  });
  it('should validationService has validateGmail as method', () => {
    expect(typeof(validationService.validateGmail)).to.eql('function');
  });
  describe('test validateEmail method', () => {
    it('should throw error - required email', () => {
      expect(() => validationService.validateEmail()).to.throw('Email required as input');
    });
    it('should throw error - add valid email', () => {
      expect(() => validationService.validateEmail(1)).to.throw('Add a valid email');
    });
    it('should throw error - add valid email', () => {
      expect(() => validationService.validateEmail('wq$%$%$&^^%%@gmail.co1m')).to.throw('Add a valid email');
    });
  });
  describe('test validateUsernameInput method', () => {
    it('should throw error - required username', () => {
      expect(() => validationService.validateUsernameInput()).to.throw('Username required as input');
    });
    it('should throw error - username as string', () => {
      expect(() => validationService.validateUsernameInput(1)).to.throw('Add username as string');
    });
  });
  describe('test validateGmail method', () => {
    it('should throw error - required gmail', () => {
      expect(() => validationService.validateGmail()).to.throw('Gmail required as input');
    });
    it('should throw error - add valid gmail', () => {
      expect(() => validationService.validateGmail('test@hotmail.com')).to.throw('Add a valid gmail');
    });
  });
});
