function validateUsernameInput(username) {
  if (!username) {
    throw new Error('Username required as input');
  }
  if (typeof username !== 'string') {
    throw new Error('Add username as string');
  }
}

module.exports = {
  validateUsernameInput,
};
