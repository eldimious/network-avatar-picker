function validateUsernameInput(username) {
  if (!username) {
    throw new Error('Username required as input');
  }
  if (typeof username !== 'string') {
    throw new Error('Add username as string');
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    throw new Error('Email required as input');
  }
  if (!re.test(email)) {
    throw new Error('Add a valid email');
  }
}

function validateGmail(email) {
  if (!email) {
    throw new Error('Gmail required as input');
  }
  validateEmail(email);
  if (!/@gmail\.com$/.test(email)) {
    throw new Error('Add a valid gmail');
  }
}

function validateRedisConfig(redisConfig) {
  if (!redisConfig) {
    throw new Error('Redis configuration required');
  }
  if (!redisConfig.host) {
    throw new Error('Redis host required');
  }
  if (!redisConfig.port) {
    throw new Error('Redis port required');
  }
}


module.exports = {
  validateUsernameInput,
  validateEmail,
  validateGmail,
  validateRedisConfig,
};
